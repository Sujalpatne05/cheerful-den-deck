import React from "react";

export default function SuperAdminAnalytics() {
  return (
    <div className="p-8 bg-[#181A20] min-h-screen text-white">
      <div className="text-2xl font-bold mb-6">System Analytics</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#23272F] rounded-xl p-6 shadow-md h-64 flex items-center justify-center text-gray-400">
          Monthly Revenue Growth (Chart Placeholder)
        </div>
        <div className="bg-[#23272F] rounded-xl p-6 shadow-md h-64 flex items-center justify-center text-gray-400">
          New Properties Growth (Chart Placeholder)
        </div>
        <div className="bg-[#23272F] rounded-xl p-6 shadow-md h-64 flex items-center justify-center text-gray-400 col-span-2">
          Occupancy Rate (Chart Placeholder)
        </div>
      </div>
    </div>
  );
}
