import React, { useContext, useEffect, useState } from 'react';
import  {Link}  from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';



const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#1F3B29]/95 shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-[310px] px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-serif text-[#D4AF37] tracking-wide">HikeKenya</Link>
        <div className="flex items-center gap-6 text-sm font-medium text-[#1F3B29]">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-[#D4AF37] transition">Dashboard</Link>
              <button type="button" onClick={logout} className="hover:text-red-400 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login-signup" className="bg-[#D4AF37] text-[#1F3B29] px-4 py-2 rounded-xl hover:bg-yellow-400 transition-all shadow-md font-semibold">Login / Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
