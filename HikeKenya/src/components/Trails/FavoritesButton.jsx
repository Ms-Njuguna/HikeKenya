import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BsHeart, BsHeartFill } from "react-icons/bs";


//Function component to receive 'userId' and 'trailId' as props

function FavoritesButton ( {trailId} ) {
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate();

  //To fetch when component loads
  useEffect (() => {
    if (!userId) return;

    fetch(`http://localhost:3000/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
        setIsFavorite(user.favorites.includes(trailId));
    });
  }, [userId, trailId]);

  //function to handle clicking 
  const handleToggleFavorite = (e) => {
    e?.preventDefault();
    if (!userId) {
      navigate("/login-signup"); // 🔁 redirect unauthenticated users
      return;
    }

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
        });
      }) 
    };
  // Return JSX and render button depending on state
  return (
    <button type="button" onClick={handleToggleFavorite} className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900">
        {isFavorite ? (<> <BsHeartFill className="text-red-600"/> Remove from Favorites </> ) : (<> <BsHeart className="text-gray-600"/> Add to Favorites </>)}
    </button>
  );
}

export default FavoritesButton;

