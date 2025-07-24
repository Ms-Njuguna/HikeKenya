import React, {useEffect, useState} from 'react'
import AppRoutes from './routes/Routes.jsx';

function App() {

  const[trails, setTrails] = useState([]);
  const[users, setUsers] =useState([]);
  const[badges, setBadges] = useState([]);
  const[reviews, setReviews] = useState([]);

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching the users...", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await fetch("http://localhost:3000/badges");
        const data = await res.json();
        setBadges(data);
      } catch (err) {
        console.error("Error fetching the badges...", err);
      }
    };

    fetchBadges();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:3000/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching the reviews...", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <AppRoutes trails={trails} badges={badges} reviews={reviews}/> 
    </div>
  )
}

export default App;