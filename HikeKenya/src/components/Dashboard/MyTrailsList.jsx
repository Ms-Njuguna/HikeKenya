import React, { useEffect, useState, useContext } from "react";
import MpesaModal from "../Mpesa/MpesaModal";
import { AuthContext } from "../../context/AuthContext";
import mpesaIcon from '../../ImageIcons/download.png';

function MyTrailsList() {
  const { user, setUser } = useContext(AuthContext);
  const userId = user?.id;

  const [joinedTrails, setJoinedTrails] = useState([]);
  const [attendedTrails, setAttendedTrails] = useState([]);
  const [trails, setTrails] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [reviewInput, setReviewInput] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(null);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setJoinedTrails(data.joinedTrails || []);
        setAttendedTrails(data.attendedTrails || data.attended || []);
        setUser(data); // update global user with latest data
      });
  }, [userId, setUser]);

  useEffect(() => {
    fetch("http://localhost:3000/trails")
      .then((res) => res.json())
      .then(setTrails)
      .catch((err) => console.error("Failed to fetch trails:", err));
  }, []);

  const hasPaidForTrail = (trailId) =>
    Array.isArray(user?.payments) &&
    user.payments.some((p) => String(p.trail) === String(trailId));

  const getTrailStatus = (trail) => {
    const isAttended = attendedTrails.map(String).includes(String(trail.id));
    const paid = hasPaidForTrail(trail.id);
    const trailDate = new Date(trail.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isAttended) return "attended";
    if (!paid) return "not_paid";
    if (trailDate > today) return "paid_upcoming";
    return "paid_past";
  };

  const handleMarkAsAttended = (trail) => {
    const trailDate = new Date(trail.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (trailDate > today) {
      alert("You can only mark as attended after the hike date.");
      return;
    }

    if (!hasPaidForTrail(trail.id)) {
      alert("Payment required before marking as attended.");
      return;
    }

    const updatedAttended = [...attendedTrails, trail.id];
    const newPoints = (user.points || 0) + 10;

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
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setShowReviewModal(trail.id);
        alert("Marked as attended 🎉");
      })
      .catch((err) => console.error("Error marking as attended:", err));
  };

  const handleReviewSubmit = (trailId) => {
    const comment = reviewInput[trailId]?.trim();
    if (!comment) return alert("Please enter a review.");

    const review = {
      userId,
      userName: user?.name || "Anonymous",
      comment,
      date: new Date().toISOString(),
    };

    const trail = trails.find((t) => t.id === trailId);
    if (!trail) return;

    const updatedReviews = [...(trail.reviews || []), review];

    fetch(`http://localhost:3000/trails/${trailId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviews: updatedReviews }),
    })
      .then((res) => res.json())
      .then((updatedTrail) => {
        setTrails((prev) =>
          prev.map((t) => (t.id === trailId ? updatedTrail : t))
        );
        setShowReviewModal(null);
        setReviewInput((prev) => ({ ...prev, [trailId]: "" }));
        alert("Review submitted! ✅");
      })
      .catch((err) => console.error("Failed to submit review:", err));
  };

  const joinedTrailDetails = trails.filter((trail) =>
    joinedTrails.map(String).includes(String(trail.id))
  );

  return (
    <div className="p-4">

      {joinedTrailDetails.length === 0 ? (
        <p className="text-gray-500">No joined trails yet!</p>
      ) : (
        <ul className="space-y-4">
          {joinedTrailDetails.map((trail) => {
            const status = getTrailStatus(trail);
            const trailDate = new Date(trail.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysLeft = Math.ceil((trailDate - today) / (1000 * 60 * 60 * 24));

            return (
              <li key={trail.id} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{trail.title}</h3>
                <p>{trail.description}</p>
                <p className="text-gray-500 text-sm">Date: {trail.date}</p>

                <div className="mt-3 space-x-2 flex flex-wrap items-center">
                  {status === "not_paid" && (
                    <button
                      onClick={() => setSelectedTrail(trail)}
                      className="bg-green-100 text-green-800 border border-green-600 px-3 py-1 rounded flex items-center gap-2 hover:bg-green-600 hover:text-white"
                    >
                      <img src={mpesaIcon} className="h-4 w-4" alt="Mpesa" />
                      Pay with M-Pesa
                    </button>
                  )}

                  {status === "paid_upcoming" && (
                    <span className="text-sm text-gray-600">
                      🕒 {daysLeft} day(s) remaining
                    </span>
                  )}

                  {status === "paid_past" && (
                    <button
                      onClick={() => handleMarkAsAttended(trail)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Mark as Attended
                    </button>
                  )}

                  {status === "attended" && (
                    <>
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        ✅ Attended
                      </span>
                      <button
                        onClick={() => setShowReviewModal(trail.id)}
                        className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                      >
                        Leave a Review
                      </button>
                    </>
                  )}
                </div>

                {showReviewModal === trail.id && (
                  <div className="mt-4 p-4 bg-gray-100 border rounded">
                    <h4 className="font-semibold mb-2">Write a Review</h4>
                    <textarea
                      className="w-full p-2 border rounded"
                      rows="3"
                      placeholder="Share your hiking experience..."
                      value={reviewInput[trail.id] || ""}
                      onChange={(e) =>
                        setReviewInput((prev) => ({
                          ...prev,
                          [trail.id]: e.target.value,
                        }))
                      }
                    ></textarea>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleReviewSubmit(trail.id)}
                        className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => setShowReviewModal(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
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
          onClose={() => {
            setSelectedTrail(null);
            fetch(`http://localhost:3000/users/${userId}`)
              .then((res) => res.json())
              .then((data) => {
                setUser(data);
                setJoinedTrails(data.joinedTrails || []);
              });
          }}
        />
      )}
    </div>
  );
}

export default MyTrailsList;
