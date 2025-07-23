import React, {useEffect, useState} from 'react';
import FavoriteButton from "./FavoritesButton";

// Function to get the user's favorites
function favoriteList ({ userId }) {
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
    <div>
        <h2></h2>

        <ul>
            <li></li>
        </ul>
    </div>
);
}

export default favoriteList;