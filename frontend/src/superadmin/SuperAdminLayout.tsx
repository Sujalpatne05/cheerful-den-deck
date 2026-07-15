import React from "react";
import SuperAdminSidebar from "./SuperAdminSidebar";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#181A20]">
      <SuperAdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
