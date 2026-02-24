import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Users,
  CreditCard,
  Sparkles,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Rooms", icon: BedDouble, path: "/rooms" },
  { label: "Bookings", icon: CalendarCheck, path: "/bookings" },
  { label: "Guests", icon: Users, path: "/guests" },
  { label: "Billing", icon: CreditCard, path: "/billing" },
  { label: "Housekeeping", icon: Sparkles, path: "/housekeeping" },
  { label: "Staff", icon: UserCog, path: "/staff" },
  { label: "Reports", icon: BarChart3, path: "/reports" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <CalendarCheck className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-sidebar-header">LodgeOS</h1>
          <p className="text-xs text-sidebar-fg">Management Suite</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-fg hover:bg-sidebar-hover hover:text-sidebar-header"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
            LA
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-sidebar-header">Lodge Admin</p>
            <p className="text-xs text-sidebar-fg">Admin</p>
          </div>
          <button className="text-sidebar-fg hover:text-sidebar-header transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
