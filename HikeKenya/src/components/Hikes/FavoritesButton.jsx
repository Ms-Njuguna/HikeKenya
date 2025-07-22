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

  return{

  }