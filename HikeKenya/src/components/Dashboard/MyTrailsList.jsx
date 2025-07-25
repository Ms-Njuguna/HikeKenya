import React, { useEffect, useState, useContext } from "react";
import MpesaModal from "../Mpesa/MpesaModal";
import { AuthContext } from "../../context/AuthContext";
import mpesaIcon from '../../ImageIcons/download.png'

function MyTrailsList() {
  const { user, setUser } = useContext(AuthContext);
  const userId = user?.id;

  const [joinedTrails, setJoinedTrails] = useState([]);
  const [trails, setTrails] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [attendedTrails, setAttendedTrails] = useState([]);
  const [reviewInput, setReviewInput] = useState({}); // To manage review text for each trail
  const [showReviewModal, setShowReviewModal] = useState(null); // To control review modal visibility

  // Fetch user data (joined + attended trails)
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setJoinedTrails(data.joinedTrails || []);
        setAttendedTrails(data.attendedTrails || []);
      });
  }, [userId]);

  // Fetch all trails
  useEffect(() => {
    fetch("http://localhost:3000/trails")
      .then((res) => res.json())
      .then(setTrails)
      .catch((error) => console.error("Failed to fetch trails", error));
  }, []);

  // Filter only joined trail details
  const joinedTrailDetails = trails.filter((trail) =>
    joinedTrails.includes(trail.id)
  );

  // 🔍 Check if user has paid for this trail
  const hasPaidForTrail = (trailId) => {
    return user?.payments?.some(
      (payment) => parseInt(payment.trail) === trailId
    );
  };

  // ✅ Mark trail as attended (only adds points if paid and date has passed)
  const handleMarkAsAttended = (trail) => {
    if (attendedTrails.includes(trail.id)) {
      alert("You already marked this trail as attended.");
      return;
    }

    const trailDate = new Date(trail.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize current date to compare with trail date

    if (trailDate > currentDate) {
      alert("You can only mark this trail as attended after the hike date has passed.");
      return;
    }

    const isPaid = hasPaidForTrail(trail.id);
    if (!isPaid) {
      alert("You must pay for this trail before marking it as attended.");
      return;
    }

    const updatedAttended = [...attendedTrails, trail.id];
    let newPoints = user.points;

    if (isPaid) {
      newPoints += 10; // Change point value as needed
    }

    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attendedTrails: updatedAttended,
        points: newPoints,
      }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setAttendedTrails(updatedUser.attendedTrails || []);
        if (isPaid) {
          const updated = { ...user, points: updatedUser.points };
          setUser(updated);
          localStorage.setItem("user", JSON.stringify(updated)); // optional
        }
        alert("Marked as attended 🎉");
        setShowReviewModal(trail.id); // Show review modal after marking attended
      })
      .catch((err) => console.error("Error updating user", err));
  };

  const handleReviewSubmit = (trailId) => {
    const reviewText = reviewInput[trailId];
    if (!reviewText || reviewText.trim() === "") {
      alert("Please write something before submitting your review.");
      return;
    }

    const review = {
      userId: userId,
      userName: user?.name || "Anonymous",
      comment: reviewText,
      date: new Date().toISOString(),
    };

    // Find the trail to update its reviews
    const trailToUpdate = trails.find(t => t.id === trailId);
    if (!trailToUpdate) return;

    const updatedReviews = [...(trailToUpdate.reviews || []), review];

    fetch(`http://localhost:3000/trails/${trailId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviews: updatedReviews }),
    })
      .then((res) => res.json())
      .then((updatedTrail) => {
        // Update the trails state with the new review
        setTrails(prevTrails =>
          prevTrails.map(t => (t.id === trailId ? updatedTrail : t))
        );
        alert("Review submitted successfully! 🎉");
        setReviewInput(prev => ({ ...prev, [trailId]: "" })); // Clear input
        setShowReviewModal(null); // Close review modal
      })
      .catch((err) => console.error("Error submitting review", err));
  };

  // UI Rendering
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🗺️ My Trails</h2>

      {joinedTrailDetails.length === 0 ? (
        <p>No trails joined yet</p>
      ) : (
        <ul className="space-y-4">
          {joinedTrailDetails.map((trail) => {
            const hasPaid = hasPaidForTrail(trail.id);
            const isAttended = attendedTrails.includes(trail.id);
            const trailDate = new Date(trail.date);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const isDatePassed = trailDate <= currentDate;

            return (
              <li key={trail.id} className="border p-4 rounded shadow">
                <h3 className="text-xl font-semibold">{trail.title}</h3>
                <p>{trail.description}</p>
                <p>Date: {trail.date}</p> {/* Display trail date */}

                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    className={`mt-2 px-3 py-1 rounded ${hasPaid ? "bg-gray-400 cursor-not-allowed" : "bg-[#FAF7F2] border border-green-700 text-green-700 hover:bg-green-600 hover:text-[#FAF7F2]"}`}
                    onClick={() => setSelectedTrail(trail)}
                    disabled={hasPaid}
                  >
                    {hasPaid ? "Paid ✅" : <span className="flex items-center gap-2"><img src={mpesaIcon} alt="M-Pesa" className="h-5 w-5" /> Pay with M-pesa</span>}
                  </button>

                  <button
                    className={`mt-2 px-3 py-1 rounded ${
                      isAttended
                        ? "bg-gray-400 cursor-not-allowed"
                        : hasPaid && isDatePassed
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => handleMarkAsAttended(trail)}
                    disabled={isAttended || !hasPaid || !isDatePassed}
                  >
                    {isAttended
                      ? "Already Attended ✅"
                      : isDatePassed
                      ? "Mark as Attended"
                      : "Date Not Passed"}
                  </button>
                </div>

                {showReviewModal === trail.id && (
                  <div className="mt-4 p-4 border rounded bg-gray-50">
                    <h4 className="font-semibold mb-2">Write a Review</h4>
                    <textarea
                      className="w-full p-2 border rounded"
                      rows="3"
                      placeholder="Share your experience..."
                      value={reviewInput[trail.id] || ""}
                      onChange={(e) =>
                        setReviewInput(prev => ({ ...prev, [trail.id]: e.target.value }))
                      }
                    ></textarea>
                    <button
                      className="mt-2 bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                      onClick={() => handleReviewSubmit(trail.id)}
                    >
                      Submit Review
                    </button>
                    <button
                      className="mt-2 ml-2 bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                      onClick={() => setShowReviewModal(null)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {selectedTrail && (
        <MpesaModal
          trail={selectedTrail}
          onClose={() => setSelectedTrail(null)}
        />
      )}
    </div>
  );
}

export default MyTrailsList;