
import type { AppRole } from "@/contexts/AuthContext";

export const roleLabelMap: Record<AppRole, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  manager: "Manager",
  frontdesk: "Front Desk",
  housekeeping: "Housekeeping",
  accountant: "Accountant",
};

const routeAccessMap: Record<string, AppRole[]> = {
  "/": ["admin", "manager", "frontdesk", "housekeeping", "accountant"],
  "/rooms": ["admin", "manager", "frontdesk", "housekeeping"],
  "/bookings": ["admin", "manager", "frontdesk"],
  "/guests": ["admin", "manager", "frontdesk"],
  "/billing": ["admin", "manager", "accountant"],
  "/housekeeping": ["admin", "manager", "housekeeping"],
  "/staff": ["admin", "manager"],
  "/reports": ["admin", "manager", "accountant"],
  "/settings": ["admin", "manager"],

  // Super Admin routes
  "/superadmin": ["superadmin"],
  "/superadmin/dashboard": ["superadmin"],
  "/superadmin/properties": ["superadmin"],
  "/superadmin/subscriptions": ["superadmin"],
  "/superadmin/revenue": ["superadmin"],
  "/superadmin/users": ["superadmin"],
  "/superadmin/analytics": ["superadmin"],
  "/superadmin/settings": ["superadmin"],
  "/superadmin/support": ["superadmin"],
};

export const canAccessRoute = (role: AppRole | undefined, routePath: string) => {
  if (!role) return false;
  const allowedRoles = routeAccessMap[routePath];
  if (!allowedRoles) return true;
  return allowedRoles.includes(role);
};
