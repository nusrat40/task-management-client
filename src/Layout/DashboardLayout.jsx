import React from "react";
import { FaHome, FaTasks } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex mt-16 bg-[#f7f5f4]">
      {/* side bar */}
      <div className="w-40 lg:w-64 min-h-screen  border-r-4">
        <ul className="menu p-4">

        <li>
            <NavLink to="/dashboard/overview">
              <TbLayoutDashboardFilled />
              Dashboard
            </NavLink>
          </li>

        <li>
            <NavLink to="/dashboard/tasks">
            <FaTasks />
              My Tasks
            </NavLink>
          </li>
        <li>
            <NavLink to="/dashboard/addTask">
            <IoCreate />
               Add Tasks
            </NavLink>
          </li>

          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>

        </ul>

      </div>



      {/* content*/}
      <div className="flex-1 px-2 lg:px-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
