import {
  CircleGauge,
  LayoutDashboard,
  LogOut,
  Package,
  User,
  UserCircle,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen bg-slate-100 w-52 p-5">
      <div className="text-center flex justify-center flex-col items-center">
        <UserCircle size={100} />
        Admin
      </div>
      <div className="mt-5 mb-2 font-semibold">Menu</div>
      <ul className="flex flex-col gap-2">
        <Link to="/">
          <li
            className={`flex items-center gap-3 py-2 px-3 rounded-xl ${
              location.pathname === "/" ? "bg-slate-200 text-blue-500" : ""
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </li>
        </Link>
        <Link to="/products">
          <li
            className={`flex items-center gap-3 py-2 px-3 rounded-xl ${
              location.pathname === "/products"
                ? "bg-slate-200 text-blue-500"
                : ""
            }`}
          >
            <Package size={18} />
            Products
          </li>
        </Link>
        <Link to="/">
          <li
            className={`flex items-center absolute bottom-5 gap-3 py-2 px-3 rounded-xl ${
              location.pathname === "/logout"
                ? "bg-slate-200 text-blue-500"
                : ""
            }`}
          >
            <LogOut size={18} />
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
