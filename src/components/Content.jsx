import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { CircleUserRound } from "lucide-react";

function Content() {
  return (
    <div className="flex flex-col  h-screen">
      <div className="flex justify-between">
        <Outlet />
        <div className="float float-right pt-5 pr-5">
          <CircleUserRound />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Content;
