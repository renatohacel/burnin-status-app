import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const { login, handlerLogin, handlerLogout, handlerUpdateProfile } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{
        login,
        handlerLogin,
        handlerLogout,
        handlerUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
