import type { AppRole } from "@/contexts/AuthContext";

export const roleLabelMap: Record<AppRole, string> = {
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
};

export const canAccessRoute = (role: AppRole | undefined, routePath: string) => {
  if (!role) return false;
  const allowedRoles = routeAccessMap[routePath];
  if (!allowedRoles) return true;
  return allowedRoles.includes(role);
};
