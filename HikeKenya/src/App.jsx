import React, {useEffect, useState} from 'react'
import FavoriteButton from './components/Hikes/FavoritesButton';

function App() {

  const[trails, setTrails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/trails")
    .then(res => res.json())
    .then((data) => {
      setTrails(data)
    })
    .catch(err => console.error("Error fething the trails...", err))
  }, []);
  
  return (
    <div>
      <h1 className="text-4xl font-bold text-green-800 shadow-md text-center">Welcome to Hike Kenya</h1>
      <FavoriteButton userId={1} trailId={3} />
    </div>
  )
}

export default App
