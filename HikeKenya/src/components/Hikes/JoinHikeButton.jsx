import React, { useEffect, useState} from "react";

// Function that receives UserId, hikeId and onJoin
function JoinHikeButton({ userId, hikeId, onJoin }) {
    
    const [joined, setJoined] = useState([]);
    
    //Use effect to fetch user joined hikes
    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setJoined(data.joinedHikes || [])); // Set joined hikes or fallback to an empty array
    }, [userId]);
    
    // Function to handle the join hike button
    function handleJoinClick () {
        if (joined.includes(hikeId)) return;

        const updated = [...joined, hikeId];

        // Send PATCH request to update the users joined hikes (backend)
        fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ joinedHikes: updated }) 
        })
        .then((res) => res.json())
        .then((data) => {setJoined(data.joinedHikes);
         onJoin && onJoin(); // call onJoin callback to refresh UI and update the list
        });
    }    
    // Return Onclick Button (The button is disabled if user already joined hike (line 36))
    return (
        <button onClick={handleJoinClick}
        className={`px-3 py-1 rounded ${joined.includes(hikeId) ? "bg-gray-300" : "bg-green-500 text-white"}`} // If joined show gray button, otherwise green
        disabled={joined.includes(hikeId)}> 
            {joined.includes(hikeId) ? "Joined ✅" : "Join Hike"}
        </button>
    );
}

export default JoinHikeButton; 