import React, { useEffect, useState} from "react";

function JoinHikeButton({ userId, hikeId, onJoin }) {
    
    const [joined, setJoined] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setJoined(data.joinedHikes || []));
    }, [userId]);

    function handleJoinClick () {
        if (joined.includes(hikeId)) return;

        const updated = [...joined, hikeId];

        fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ joinedHikes: updated }) 
        })
        .then((res) => res.json())
        .then((data) => {setJoined(data.joinedHikes);
         onJoin && onJoin();
        });
    }    
    
    return (
        <button onClick={handleJoinClick}
        className={`px-3 py-1 rounded ${joined.includes(hikeId) ? "bg-gray-300" : "bg-green-500 text-white"}`}
        disabled={joined.includes(hikeId)}>
            {joined.includes(hikeId) ? "Joined ✅" : "Join Hike"}
        </button>
    );
}

export default JoinHikeButton; 