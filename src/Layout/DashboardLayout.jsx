import React from "react";

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* side bar */}
      <div className="w-64 min-h-screen bg-[#f5edfe]">
        <ul className="menu p-4">

        </ul>


      </div>



      {/* content*/}
      <div className="flex-1 p-2 lg:p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
