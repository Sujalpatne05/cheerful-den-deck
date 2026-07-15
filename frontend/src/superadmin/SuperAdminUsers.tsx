import React from "react";

export default function SuperAdminUsers() {
  return (
    <div className="p-8 bg-[#181A20] min-h-screen text-white">
      <div className="text-2xl font-bold mb-6">Manage Users</div>
      <div className="bg-[#23272F] rounded-xl p-6 shadow-md overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-400">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Property</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">john@example.com</td>
              <td className="py-2 px-4">Admin</td>
              <td className="py-2 px-4">Sunrise Hotel</td>
              <td className="py-2 px-4 text-green-400">Active</td>
              <td className="py-2 px-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Suspend</button>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">jane@example.com</td>
              <td className="py-2 px-4">Manager</td>
              <td className="py-2 px-4">City Inn</td>
              <td className="py-2 px-4 text-red-400">Suspended</td>
              <td className="py-2 px-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">Edit</button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Activate</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
