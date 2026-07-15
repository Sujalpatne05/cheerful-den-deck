import React from "react";
import { FaBuilding, FaCreditCard, FaChartBar, FaUsers, FaCog, FaLifeRing, FaTachometerAlt, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/superadmin/dashboard" },
  { label: "Properties", icon: <FaBuilding />, path: "/superadmin/properties" },
  { label: "Subscriptions", icon: <FaCreditCard />, path: "/superadmin/subscriptions" },
  { label: "Revenue", icon: <FaMoneyBillWave />, path: "/superadmin/revenue" },
  { label: "Users", icon: <FaUsers />, path: "/superadmin/users" },
  { label: "Analytics", icon: <FaChartLine />, path: "/superadmin/analytics" },
  { label: "System Settings", icon: <FaCog />, path: "/superadmin/settings" },
  { label: "Support", icon: <FaLifeRing />, path: "/superadmin/support" },
];

export default function SuperAdminSidebar() {
  return (
    <aside className="h-screen w-64 bg-[#181A20] text-white flex flex-col py-6 px-4 shadow-lg">
      <div className="mb-8 flex items-center gap-3">
        <FaChartBar className="text-3xl text-blue-500" />
        <div>
          <div className="font-bold text-lg">Super Admin</div>
          <div className="text-xs text-gray-400">Platform Control</div>
        </div>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-[#23272F] text-gray-300"
                  }`
                }
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
