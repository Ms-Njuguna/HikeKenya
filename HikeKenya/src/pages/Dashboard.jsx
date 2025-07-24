import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import UserInfo from '../components/Dashboard/UserInfo';
// import Badges from '../components/Dashboard/Badges';


function Dashboard({ badges }) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>This is the Dashboard page</h1>

      {user ? (
        <>
          <UserInfo name={user.name} email={user.email} points={user.points} />
          {/* <Badges user={user} badges={badges} /> */}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;