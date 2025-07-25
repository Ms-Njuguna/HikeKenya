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
    <div className="min-h-screen">
      <Navbar />

      {user ? (
        <div className="max-w-5xl mx-auto my-[70px] py-10 px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-md border border-green-100">
          {/* User Info */}
          <div className="pb-6">
            <UserInfo name={user.name} email={user.email} points={user.points} />
          </div>

          {/* Badges */}
          <div className="border-t border-gray-200 py-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">My Badges</h2>
            <Badges user={user} badges={badges} />
          </div>

          {/* My Trails */}
          <div className="border-t border-gray-200 py-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">My Trails List</h2>
            <MyTrailsList />
          </div>

          {/* Favorites */}
          <div className="border-t border-gray-200 py-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">My Favorites</h2>
            <FavoritesList />
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 text-lg">Loading user data...</div>
      )}
    </div>
  );
}



export default Dashboard;