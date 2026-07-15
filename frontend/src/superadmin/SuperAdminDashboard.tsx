import React from "react";
// Placeholder icons, replace with your preferred icon set
import { FaBuilding, FaCheckCircle, FaDoorOpen, FaCalendarCheck, FaDollarSign, FaBan } from "react-icons/fa";

const kpis = [
  { label: "Total Properties", value: 128, icon: <FaBuilding className="text-blue-400" /> },
  { label: "Active Subscriptions", value: 112, icon: <FaCheckCircle className="text-green-400" /> },
  { label: "Total Rooms Across Platform", value: 3200, icon: <FaDoorOpen className="text-yellow-400" /> },
  { label: "Total Bookings Today", value: 245, icon: <FaCalendarCheck className="text-purple-400" /> },
  { label: "Monthly Platform Revenue", value: "$52,000", icon: <FaDollarSign className="text-cyan-400" /> },
  { label: "Suspended Accounts", value: 7, icon: <FaBan className="text-red-400" /> },
];

export default function SuperAdminDashboard() {
  return (
    <div className="flex flex-col gap-8 p-8 bg-[#181A20] min-h-screen text-white">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="flex items-center gap-4 bg-[#23272F] rounded-xl p-6 shadow-md">
            <div className="text-3xl">{kpi.icon}</div>
            <div>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="text-gray-400 text-sm">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section (placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#23272F] rounded-xl p-6 shadow-md h-64 flex items-center justify-center text-gray-400">
          Monthly Revenue Growth (Chart)
        </div>
        <div className="bg-[#23272F] rounded-xl p-6 shadow-md h-64 flex items-center justify-center text-gray-400">
          New Properties Growth (Chart)
        </div>
        <div className="bg-[#23272F] rounded-xl p-6 shadow-md h-64 flex items-center justify-center text-gray-400">
          Occupancy Rate (Chart)
        </div>
      </div>

      {/* Property Performance Table (placeholder) */}
      <div className="bg-[#23272F] rounded-xl p-6 shadow-md overflow-x-auto">
        <div className="text-lg font-semibold mb-4">Property Performance Overview</div>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-400">
              <th className="py-2 px-4">Property Name</th>
              <th className="py-2 px-4">Total Rooms</th>
              <th className="py-2 px-4">Occupancy %</th>
              <th className="py-2 px-4">Revenue</th>
              <th className="py-2 px-4">Plan</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Example rows, replace with dynamic data */}
            <tr>
              <td className="py-2 px-4">Sunrise Hotel</td>
              <td className="py-2 px-4">120</td>
              <td className="py-2 px-4">87%</td>
              <td className="py-2 px-4">$12,000</td>
              <td className="py-2 px-4">Pro</td>
              <td className="py-2 px-4 text-green-400">Active</td>
            </tr>
            <tr>
              <td className="py-2 px-4">City Inn</td>
              <td className="py-2 px-4">80</td>
              <td className="py-2 px-4">75%</td>
              <td className="py-2 px-4">$7,500</td>
              <td className="py-2 px-4">Standard</td>
              <td className="py-2 px-4 text-yellow-400">Pending</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Ocean View</td>
              <td className="py-2 px-4">200</td>
              <td className="py-2 px-4">92%</td>
              <td className="py-2 px-4">$22,000</td>
              <td className="py-2 px-4">Enterprise</td>
              <td className="py-2 px-4 text-red-400">Suspended</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
