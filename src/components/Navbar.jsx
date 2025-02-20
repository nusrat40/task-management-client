import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);



  return (
    <div className="navbar  container mx-auto px-12 sticky top-0">
      <div className="navbar-start">
        <NavLink to='/' className="btn btn-ghost text-2xl">Organizo</NavLink>
      </div>

      <div className="navbar-end space-x-3">

        {user ? (
          <div className="flex items-center justify-center gap-2">
            <img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="User Avatar" />
            <button className="btn bg-[#fae150] font-bold" onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button className="btn bg-[#fae150] ">
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
