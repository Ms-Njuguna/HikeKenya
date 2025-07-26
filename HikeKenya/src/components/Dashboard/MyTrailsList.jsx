import React, { useEffect, useState, useContext } from "react";
import MpesaModal from "../Mpesa/MpesaModal";
import { AuthContext } from "../../context/AuthContext";
import MpesaAnimatedButton from '../ui/MpesaAnimatedButton';
import { toast } from 'sonner';

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

  const hasPaidForTrail = (trailId) => Array.isArray(user?.payments) && user.payments.some((p) => String(p.trail) === String(trailId));

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
        toast.success("Successfully marked trail as attended!", {
          position: "top-center", 
          style: {
            borderRadius: '8px',
            background: '#1F3B29',
            color: '#fff',
          },
        });
      })
      .catch((err) => console.error("Error marking as attended:", err));
  };

  const handleReviewSubmit = (trailId) => {
  const comment = reviewInput[trailId]?.trim();
  if (!comment) return alert("Please enter a review.");

  const newReview = {
    trailId,
    userId,
    username: user?.name || "Anonymous",
    comment,
    rating: 5, // You can make this dynamic later
    date: new Date().toISOString().split("T")[0] // Format: YYYY-MM-DD
  };

  fetch(`http://localhost:3000/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newReview),
  })
    .then((res) => res.json())
    .then(() => {
      toast.success("Successfully added a review!", {
          position: "top-center", 
          style: {
            borderRadius: '8px',
            background: '#1F3B29',
            color: '#fff',
          },
        });
      setShowReviewModal(null);
      setReviewInput((prev) => ({ ...prev, [trailId]: "" }));
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
              <li key={trail.id} className="border p-4 rounded-[8px] shadow">
                <h3 className="text-lg font-semibold">{trail.title}</h3>
                <p>{trail.description}</p>
                <p className="text-gray-500 text-sm">Date: {trail.date}</p>

                <div className="mt-3 space-x-2 flex flex-wrap items-center">
                  {status === "not_paid" && (
                    <MpesaAnimatedButton onClick={() => setSelectedTrail(trail)} />
                  )}

                  {status === "paid_upcoming" && (
                    <span className="text-sm text-gray-600 flex gap-2">
                      <svg className="animate-clock" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1F3B29"><path d="m438-298 226-226-57-57-169 169-85-85-57 57 142 142Zm42 218q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z"/></svg> 
                      {daysLeft} day(s) remaining
                    </span>
                  )}

                  {status === "paid_past" && (
                    <button
                      type="button"
                      onClick={() => handleMarkAsAttended(trail)}
                      className="bg-[#1F3B29] text-white px-3 py-1 rounded-[8px] hover:bg-[#D4AF37]"
                    >
                      Mark as Attended
                    </button>
                  )}

                  {status === "attended" && (
                    <>
                      <span className="text-[#1F3B29] font-medium items-center flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1F3B29"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                         <p>Attended</p>
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowReviewModal(trail.id)}
                        className="bg-[#1F3B29] text-white px-3 py-1 rounded-[8px] hover:bg-[#D4AF37]"
                      >
                        Leave a Review
                      </button>
                    </>
                  )}
                </div>

                {showReviewModal === trail.id && (
                  <div className="mt-4 p-4 bg-[#FAF7F2] border rounded-[8px]">
                    <h4 className="font-semibold mb-2">Write a Review</h4>
                    <textarea
                      className="w-full p-2 border rounded-[8px]"
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
                        type="button"
                        onClick={() => handleReviewSubmit(trail.id)}
                        className="bg-[#1F3B29] text-white px-3 py-1 rounded-[8px]"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewModal(null)}
                        className=" text-[#1F3B29] px-3 py-1 rounded-[8px] "
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
