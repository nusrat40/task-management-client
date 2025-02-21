import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";  // Import useNavigate
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogout = async () => {
    try {
      await logOut();  // Call logOut function from context
      navigate("/");   // Navigate to home after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar bg-[#f7f5f4] container mx-auto px-12 fixed top-0 z-50">
      <div className="navbar-start">


           {/* Dropdown for small screens */}
           <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {user ? (
              <>
              
              <img className="w-14 h-14 rounded-full mx-auto" src={user?.photoURL} alt="User Avatar" />
              
                <li>
                  <button onClick={handleLogout} className="btn bg-[#fae150] w-full">
                    Logout
                  </button>
                </li>
                <li>
                  <Link to="/dashboard/overview" className="btn bg-[#fae150] w-full">
                    Dashboard
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="btn bg-[#fae150] w-full">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="btn bg-[#fae150] w-full">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <NavLink to="/" className="btn btn-ghost text-2xl">
          Organizo
        </NavLink>
      </div>

      <div className="navbar-end hidden lg:flex space-x-3">
        {user ? (
          <div className="flex items-center justify-center gap-2">
            <img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="User Avatar" />
            <button className="btn bg-[#fae150]" onClick={handleLogout}>
              Logout
            </button>
            <button className="btn bg-[#fae150]">
              <Link to="/dashboard/overview">Dashboard</Link>
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button className="btn bg-[#fae150]">
              <Link to="/login">Log in</Link>
            </button>
            <button className="btn bg-[#fae150]">
              <Link to="/register">Register</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
