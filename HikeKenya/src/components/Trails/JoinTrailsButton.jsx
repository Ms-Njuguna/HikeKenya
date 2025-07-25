import React, { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


// Function that receives UserId, trailId and onJoin
function JoinTrailsButton({ trailId, onJoin }) {
    const { user } = useContext(AuthContext);
    const userId = user?.id;
    
    const [joined, setJoined] = useState([]);
    const navigate = useNavigate();
    
    //Use effect to fetch user joined trails
    useEffect(() => {
        if (!userId) return;

        fetch(`http://localhost:3000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setJoined(data.joinedTrails || [])); // Set joined trails or fallback to an empty array
    }, [userId]);
    
    // Function to handle the join trail button
    function handleJoinClick () {
        if (!userId) {
          navigate("/login-signup"); // 🔁 redirect unauthenticated users
          return;
        }

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
    
    if (!userId) {
      return <p className="text-sm text-gray-500">Log in to join this trail</p>;
    }

    // Return Onclick Button (The button is disabled if user already joined trail (line 36))
    return (
        <button onClick={handleJoinClick}
        className={`px-3 py-1 rounded ${joined.includes(trailId) ? "bg-gray-300" : "bg-green-500 text-white"}`} // If joined show gray button, otherwise green
        disabled={joined.includes(trailId)}> 
            {joined.includes(trailId) ? "Joined ✅" : "Join Trail"}
        </button>
    );
}

export default JoinTrailsButton; 