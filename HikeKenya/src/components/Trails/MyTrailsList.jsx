import React, {useEffect, useState} from "react";
import MpesaModal from "./Mpesamodal";

function MyTrailsList ({ userId }) {

    const [joinedTrails, setJoinedTrails] = useState([]);
    const [trails, setTrails] = useState([]);
    const [selectedTrail, setSelectedTrail] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            setJoinedTrails(data.joinedTrails || []);
        });
    }, [userId]);


    useEffect(() =>{
        fetch("http://localhost:3000/trails")
        .then((res) => res.json())
        .then(setTrails)
        .catch(error => console.error("Failed to fetch trails", error));
    }, []);

    const joinedTrailDetails = trails.filter(trail =>
        joinedTrails.includes(trail.id)
     );


     return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">🗺️ My Trails</h2>
            {joinedTrailDetails.length === 0 ? (
                <p>No trails joined yet</p>
            ) : (
                <ul className="space-y-4">
                    {joinedTrailDetails.map(trail => (
                        <li key={trail.id} className="border p-4 rounded shadow">
                          <h3 className="text-xl font-semibold">{trail.name}</h3>
                          <p>{trail.description}</p>
                          <button className="mt-2 bg-gree-500 text-white px-3 py-1 rounded" 
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