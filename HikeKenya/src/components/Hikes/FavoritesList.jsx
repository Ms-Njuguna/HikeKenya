import React, {useEffect, useState} from 'react';
import FavoriteButton from "./FavoritesButton";

// Function to get the user's favorites
function FavoriteList ({ userId }) {
    const [favoriteTrails, setFavoriteTrails] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);

// UseEffect to fetch the user's favorites
useEffect(() =>{
    fetch(`http://localhost:3000/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
        setUserFavorites(user.favorites);

        return fetch("http://localhost:3000/trails");
    })
    .then((res) => res.json())
    .then((trails) => {
        const favs = trails.filter ((trail) => userFavorites.includes(trail.id));
        setFavoriteTrails(favs);
    })
    .catch((err) => console.error("Error loading favorites:", err));
}, [userId, userFavorites]);

// Refetch favorites when a toggle happens
const handleFavoriteChange = () => {
    fetch(`http://localhost:3000/users/${userId}`)
    .then((res) => res.json())
    .then((user) => setUserFavorites(user.favorites));
}

return (
    <div className="p-4 border-t mt-4">
        <h2 className="text-2xl font-semibold text-green-700">Your Favorites</h2>
        {favoriteTrails.length === 0 ? (
            <p className="text-gray-500">No favorites yet!</p>
        ) : (
            <ul className="mt-2 space-y-2">
                {favoriteTrails.map((trail) => (
                    <li key={trail.id} className="flex justify-between items-center">
                        <span>{trail.name}</span>
                        <FavoriteButton
                          userId={userId}
                          trailId={trail.id}
                          onToggle={handleFavoriteChange}
                        />
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
}

export default FavoriteList;