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
        .then(setTrails);
    }, []);

    const joinedTrailDetails = trails.filter(trail =>
        joinedTrails.includes(trail.id)
     );


     return (
        <div>
            <h2>🗺️ My Trails</h2>
            {joinedTrailDetails.length === 0 ? (
                <p>No trails joined yet</p>
            ) : (
                <ul>
                    {joinedTrailDetails.map(trail => (
                        <li key={trail.id}>
                          <h3>{trail.name}</h3>
                          <p>{trail.description}</p>
                          <button onClick={() => setSelectedTrail(trail)}>
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