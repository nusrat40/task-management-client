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
        <NavLink to="/" className="btn btn-ghost text-2xl">
          Organizo
        </NavLink>
      </div>

      <div className="navbar-end space-x-3">
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
