import React, { useContext, useEffect, useState } from 'react';
import  {Link}  from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';



const Navbar = ({ isDashboard }) => {
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
        <Link to="/" className="text-xl font-serif text-[#D4AF37] tracking-wide flex gap-2">
          {isDashboard && (
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D4AF37"><path d="M180-120q-25 0-42.5-17.5T120-180v-76l160-142v278H180Zm140 0v-160h320v160H320Zm360 0v-328L509-600l121-107 190 169q10 9 15 20.5t5 24.5v313q0 25-17.5 42.5T780-120H680ZM120-310v-183q0-13 5-25t15-20l300-266q8-8 18.5-11.5T480-819q11 0 21.5 3.5T520-804l80 71-480 423Z"/></svg>
          )}
          <span>HikeKenya</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-[#1F3B29]">
          {isAuthenticated ? (
            <div className='flex gap-8'> 
              <Link to="/dashboard" className="text-[#D4AF37] hover:text-red-400 transition flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#D4AF37"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
                <span className='ml-2'>Dashboard</span>
              </Link>
              <button type="button" onClick={logout} className="text-[#D4AF37] hover:text-red-400 transition">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login-signup" className="bg-[#D4AF37] text-[#1F3B29] px-4 py-2 rounded-[8px] hover:bg-[#1F3B29] hover:text-white transition-all shadow-md font-semibold">Login / Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
