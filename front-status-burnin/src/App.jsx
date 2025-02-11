import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./auth/context/AuthContext";
import { LoginPage } from "./pages/login/LoginPage";
import { StatusRoutes } from "./routes/StatusRoutes";

function App() {
  const { login } = useContext(AuthContext);
  return (
    <Routes>
      {login.isAuth ? (
        <Route path="/*" element={<StatusRoutes />} />
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
