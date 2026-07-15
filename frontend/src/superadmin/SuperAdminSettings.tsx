import React from "react";

export default function SuperAdminSettings() {
  return (
    <div className="p-8 bg-[#181A20] min-h-screen text-white">
      <div className="text-2xl font-bold mb-6">Global System Settings</div>
      <div className="bg-[#23272F] rounded-xl p-6 shadow-md">
        <div className="text-gray-400 mb-2">(Settings form placeholder)</div>
        <form className="space-y-4 max-w-lg">
          <div>
            <label className="block mb-1 text-gray-300">Platform Name</label>
            <input className="w-full px-3 py-2 rounded bg-[#181A20] border border-gray-600 text-white" placeholder="Room Management Platform" />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Support Email</label>
            <input className="w-full px-3 py-2 rounded bg-[#181A20] border border-gray-600 text-white" placeholder="support@example.com" />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Default Currency</label>
            <input className="w-full px-3 py-2 rounded bg-[#181A20] border border-gray-600 text-white" placeholder="USD" />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold mt-4">Save Settings</button>
        </form>
      </div>
    </div>
  );
}
