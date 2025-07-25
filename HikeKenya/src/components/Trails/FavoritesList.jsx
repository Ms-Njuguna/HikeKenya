import React, {useEffect, useState, useContext} from 'react';
import FavoritesButton from "./FavoritesButton.jsx";
import { AuthContext } from "../../context/AuthContext";

// Function to get the user's favorites
function FavoritesList () {
    const { user } = useContext(AuthContext);
    const userId = user?.id;
    const [favoriteTrails, setFavoriteTrails] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);

    // UseEffect to fetch the user's favorites
    useEffect(() =>{
      fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((user) => setUserFavorites(user.favorites))
      .catch((err) => console.error("Error loading user:", err));    
    }, [userId,]);


    // UseEffect to fetch the trails & filter only the favorited ones
    useEffect(() => {
       fetch(`http://localhost:3000/trails`)
       .then((res) => res.json())
       .then((trails) => {
           const favs = trails.filter((trail) => userFavorites.includes(trail.id));
           setFavoriteTrails(favs);
        })
       .catch((err) => console.error("Error loading trails:", err));
    }, [userFavorites]);

    // Refresh favorites when a toggle happens
    const refreshFavorites = () => {
       fetch(`http://localhost:3000/users/${userId}`)
       .then((res) => res.json())
       .then((user) => setUserFavorites(user.favorites));
    }

    return (
        <div className="p-4 mt-4">
           {favoriteTrails.length === 0 ? ( // Conditional rendering (show message if no favorites)
               <p className="text-gray-400">No favorites yet!</p>
            ) : (
               <ul className="mt-2 space-y-2">
                    {favoriteTrails.map((trail) => ( //Render each trail with it's name, add toggle button & refresh list on toggle 
                        <li key={trail.id} className="flex justify-between items-center">
                            <div className='flex flex-row gap-12'>
                                <img src={trail.photos[1]} alt='favorite photo' className='rounded-[6px] h-40 w-40'></img>
                                <div>
                                    <h3>{trail.title}</h3>
                                    <p>{trail.date}</p>
                                    <small>Difficulty - {trail.difficulty}</small>
                                </div>
                            </div>
                            <FavoritesButton
                              userId={userId}
                              trailId={trail.id}
                              onToggle={refreshFavorites}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FavoritesList;