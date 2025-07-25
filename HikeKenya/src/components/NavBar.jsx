import React, { useContext } from 'react';
import  {Link}  from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';



const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login-signup">Login/Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
