import React from "react";

export default function SuperAdminSupport() {
  return (
    <div className="p-8 bg-[#181A20] min-h-screen text-white">
      <div className="text-2xl font-bold mb-6">Support & Contact</div>
      <div className="bg-[#23272F] rounded-xl p-6 shadow-md">
        <div className="text-gray-400 mb-2">(Support info placeholder)</div>
        <div className="mb-4">For assistance, contact our support team at <span className="text-blue-400">support@example.com</span>.</div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold">Open Support Ticket</button>
      </div>
    </div>
  );
}
