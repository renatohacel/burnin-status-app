import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";

export const Navbar = () => {
  const { login, handlerLogout } = useContext(AuthContext);

  return (
    <header className="sticky top-0 backdrop-blur-xl bg-black/50 border-b border-white/10 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <NavLink className="text-2xl font-medium hover:text-blue-500 transition-all duration-100">
            Burnin Task Status
          </NavLink>
          {/* Button Section */}
          <div className="flex items-center gap-2">
            {/* User */}
            <button
              className="w-8 h-8 rounded-full hover:text-blue-500 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hover:cursor-pointer"
              aria-label="User Profile"
            >
              <FaUser className="w-4 h-4" />
            </button>

            {/* Logout */}
            <button
              className="w-20 hover:text-blue-500 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-sm font-semibold hover:cursor-pointer"
              aria-label="Log Out"
              onClick={handlerLogout}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
