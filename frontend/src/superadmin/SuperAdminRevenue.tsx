import React from "react";

export default function SuperAdminRevenue() {
  return (
    <div className="p-8 bg-[#181A20] min-h-screen text-white">
      <div className="text-2xl font-bold mb-6">Platform Revenue</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#23272F] rounded-xl p-6 shadow-md h-64 flex items-center justify-center text-gray-400">
          Revenue Chart (Placeholder)
        </div>
        <div className="bg-[#23272F] rounded-xl p-6 shadow-md h-64 flex items-center justify-center text-gray-400">
          Revenue Breakdown (Placeholder)
        </div>
      </div>
      <div className="bg-[#23272F] rounded-xl p-6 shadow-md overflow-x-auto">
        <div className="text-lg font-semibold mb-4">Recent Transactions</div>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-400">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Property</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">2026-02-28</td>
              <td className="py-2 px-4">Sunrise Hotel</td>
              <td className="py-2 px-4">$1,200</td>
              <td className="py-2 px-4">Subscription</td>
              <td className="py-2 px-4 text-green-400">Paid</td>
            </tr>
            <tr>
              <td className="py-2 px-4">2026-02-27</td>
              <td className="py-2 px-4">City Inn</td>
              <td className="py-2 px-4">$800</td>
              <td className="py-2 px-4">Subscription</td>
              <td className="py-2 px-4 text-yellow-400">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
