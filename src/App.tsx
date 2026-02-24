import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppRole, AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Rooms from "@/pages/Rooms";
import Bookings from "@/pages/Bookings";
import Guests from "@/pages/Guests";
import Billing from "@/pages/Billing";
import Housekeeping from "@/pages/Housekeeping";
import Staff from "@/pages/Staff";
import Reports from "@/pages/Reports";
import SettingsPage from "@/pages/SettingsPage";
import Login from "@/pages/Login";
import NotFound from "./pages/NotFound";
import { canAccessRoute } from "@/lib/access";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles, routePath }: { children: React.ReactNode; allowedRoles?: AppRole[]; routePath?: string }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  if (routePath && !canAccessRoute(user?.role, routePath)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<ProtectedRoute routePath="/"><Dashboard /></ProtectedRoute>} />
              <Route path="/rooms" element={<ProtectedRoute routePath="/rooms"><Rooms /></ProtectedRoute>} />
              <Route path="/bookings" element={<ProtectedRoute routePath="/bookings"><Bookings /></ProtectedRoute>} />
              <Route path="/guests" element={<ProtectedRoute routePath="/guests"><Guests /></ProtectedRoute>} />
              <Route path="/billing" element={<ProtectedRoute routePath="/billing"><Billing /></ProtectedRoute>} />
              <Route path="/housekeeping" element={<ProtectedRoute routePath="/housekeeping"><Housekeeping /></ProtectedRoute>} />
              <Route path="/staff" element={<ProtectedRoute routePath="/staff"><Staff /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute routePath="/reports"><Reports /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute routePath="/settings"><SettingsPage /></ProtectedRoute>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
