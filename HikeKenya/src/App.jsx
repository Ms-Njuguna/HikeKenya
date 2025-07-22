import React, {useEffect, useState} from 'react'
import AppRoutes from './routes/Routes.jsx';



function App() {

  const[trails, setTrails] = useState([]);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const res = await fetch("http://localhost:3000/trails");
        const data = await res.json();
        setTrails(data);
      } catch (err) {
        console.error("Error fetching the trails...", err);
      }
    };

    fetchTrails();
  }, []);
  
  return (
    <div>
      <h1 className="text-4xl font-bold text-green-800 shadow-md text-center">Welcome to Hike Kenya</h1>
      <AppRoutes /> 
    </div>
  )
}

export default App
