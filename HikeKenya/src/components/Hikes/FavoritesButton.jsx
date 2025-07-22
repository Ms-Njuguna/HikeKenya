import React, {useState, useEffect} from "react";

//Function component to receive 'userId' and 'trailId' as props

function FavoriteButton ( {userId, trailId} ) {
    const [isFavorite, setIsfavorite] = useState(false)
}
//To fetch when component loads
useEffect (() => {
    fetch(`htpp://localhost:3000/users/${userId}`)
    .then((res) => res.json))
    .then((user) => {
        setIsfavorite(user.favorites.includes(trailId));
    });
}, [userId, trailId]

//function to handle clicking 
const handleToggleFavorite = () => {
    fetch(`htpp://localhost:3000/users/${userId}`) //Fetch user data
    .then((res) => res.json())
    .then((user) => {
        const updatefavorites = isFavorite ? user.favorites.filter((id) => id !== trailId)
        : [...user.favorites, trailId]; //Update favorites
    })

    fetch(`htpp://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify({ favorites : updatedFavorites }), 
    })
      .then((res) => res.json())
      .then(() => {
        setIsfavorite(!isFavorite);
      }); 
}

  return{

  }