import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-[#f7f5f4] container mx-auto px-12">
      <div className="navbar-start">
        <a className="btn btn-ghost text-2xl">Organizo</a>
      </div>

      <div className="navbar-end space-x-3">
        <button className="btn bg-[#fae150] ">
          <Link to="/login">Log in</Link>
        </button>
        <button className="btn bg-[#fae150]">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
