import React, {useState, useEffect} from "react";

//Function component to receive 'userId' and 'trailId' as props

function FavoritesButton ( {userId, trailId} ) {
    const [isFavorite, setIsFavorite] = useState(false)

//To fetch when component loads
useEffect (() => {
    fetch(`http://localhost:3000/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
        setIsFavorite(user.favorites.includes(trailId));
    });
  }, [userId, trailId]);

//function to handle clicking 
const handleToggleFavorite = () => {
    fetch(`http://localhost:3000/users/${userId}`) //Fetch user data
    .then((res) => res.json())
    .then((user) => {
        const updatedFavorites = isFavorite ? user.favorites.filter((id) => id !== trailId)
        : [...user.favorites, trailId]; //Update favorites

        // Update user data on the server
      fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ favorites : updatedFavorites }), 
    })
        .then((res) => res.json())
        .then(() => {
          setIsFavorite(!isFavorite); // Toggle state to update button label
          if (onToggle) onToggle();
        });
      }) 
    };
  // Return JSX and render button depending on state
  return (
    <button onClick={handleToggleFavorite}>
        {isFavorite ? '🤍 Unfavorite' : '💖 Favorite'}
    </button>
  );
}

export default FavoritesButton;