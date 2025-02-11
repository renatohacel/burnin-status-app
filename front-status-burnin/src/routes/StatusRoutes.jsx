import { Navigate, Route, Routes } from "react-router-dom";
import { StatusProvider } from "../context/StatusProvider";
import { StatusPage } from "../pages/status/StatusPage";
import { Navbar } from "../components/navbar/Navbar";

export const StatusRoutes = () => {
  return (
    <StatusProvider>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="home" element={<StatusPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </StatusProvider>
  );
};
