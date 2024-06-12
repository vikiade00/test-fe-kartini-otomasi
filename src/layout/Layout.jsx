import React from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="flex w-screen">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <Content />
      </div>
    </div>
  );
}

export default Layout;
