import React, { useEffect, useState} from "react";

// Function that receives UserId, trailId and onJoin
function JoinTrailButton({ userId, hikeId, onJoin }) {
    
    const [joined, setJoined] = useState([]);
    
    //Use effect to fetch user joined trails
    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setJoined(data.joinedHikes || [])); // Set joined trails or fallback to an empty array
    }, [userId]);
    
    // Function to handle the join trail button
    function handleJoinClick () {
        if (joined.includes(trailId)) return;

        const updated = [...joined, trailId];

        // Send PATCH request to update the users joined trails (backend)
        fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ joinedTrails: updated }) 
        })
        .then((res) => res.json())
        .then((data) => {setJoined(data.joinedTrails);
         onJoin && onJoin(); // call onJoin callback to refresh UI and update the list
        });
    }    
    // Return Onclick Button (The button is disabled if user already joined trail (line 36))
    return (
        <button onClick={handleJoinClick}
        className={`px-3 py-1 rounded ${joined.includes(trailIdId) ? "bg-gray-300" : "bg-green-500 text-white"}`} // If joined show gray button, otherwise green
        disabled={joined.includes(trailId)}> 
            {joined.includes(trailId) ? "Joined ✅" : "Join Trail"}
        </button>
    );
}

export default JoinTrailButton; 