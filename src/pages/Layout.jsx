import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex min-h-screen">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6 mt-16 ml-8 bg-gray-100">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
