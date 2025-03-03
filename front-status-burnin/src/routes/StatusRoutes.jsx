import { Navigate, Route, Routes } from "react-router-dom";
import { StatusProvider } from "../context/StatusProvider";
import { StatusPage } from "../pages/status/StatusPage";
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/template/Footer";
import { UsersPage } from "../pages/users/UsersPage";
import { ActivityLogsPage } from "../pages/activity_logs/ActivityLogsPage";
import { UsersTracking } from "../pages/users/UsersTracking";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

export const StatusRoutes = () => {
  const { login } = useContext(AuthContext);
  return (
    <StatusProvider>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="home" element={<StatusPage />} />

            <Route path="activity-logs" element={<ActivityLogsPage />} />
            {login.user.isAdmin === 1 ? (
              <>
                <Route path="users-manage" element={<UsersPage />} />
                <Route path="users-tracking" element={<UsersTracking />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/home" />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </StatusProvider>
  );
};
