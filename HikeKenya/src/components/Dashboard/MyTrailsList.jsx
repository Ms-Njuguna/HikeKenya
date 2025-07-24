import React, {useEffect, useState} from "react";
import MpesaModal from "../Mpesa/MpesaModal";

// Function for myTrailList receiving userId as prop
function MyTrailsList ({ userId }) {

    const [joinedTrails, setJoinedTrails] = useState([]);
    const [trails, setTrails] = useState([]);
    const [selectedTrail, setSelectedTrail] = useState(null);
    
    // Use effect to fetch user data & get trails they have joined
    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            setJoinedTrails(data.joinedTrails || []);
        });
    }, [userId]);

    // Use effect to fetch list of all trails
    useEffect(() =>{
        fetch("http://localhost:3000/trails")
        .then((res) => res.json())
        .then(setTrails)
        .catch(error => console.error("Failed to fetch trails", error));
    }, []);
    
    // Filter out only the trails the user has joined
    const joinedTrailDetails = trails.filter(trail =>
        joinedTrails.includes(trail.id)
     );

     // Return the UI
     return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">🗺️ My Trails</h2>
            {joinedTrailDetails.length === 0 ? ( // If no joined trails, return message
                <p>No trails joined yet</p>
            ) : (
                <ul className="space-y-4">
                    {joinedTrailDetails.map(trail => (  
                        <li key={trail.id} className="border p-4 rounded shadow">
                          <h3 className="text-xl font-semibold">{trail.name}</h3>
                          <p>{trail.description}</p>
                          <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded" 
                          onClick={() => setSelectedTrail(trail)}>
                            Pay with M-pesa
                            </button> 
                        </li>
                    ))}
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