import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import UserInfo from '../components/Dashboard/UserInfo';
import Badges from '../components/Dashboard/Badges';
import Navbar from '../components/NavBar.jsx'
import MyTrailsList from '../components/Dashboard/MyTrailsList.jsx'
import FavoritesList from "../components/Trails/FavoritesList.jsx";


function Dashboard({ badges }) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <h1>This is the Dashboard page</h1>

      {user ? (
        <>
          <UserInfo name={user.name} email={user.email} points={user.points} />
          <Badges user={user} badges={badges} /> 
          <MyTrailsList />
          <FavoritesList />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;