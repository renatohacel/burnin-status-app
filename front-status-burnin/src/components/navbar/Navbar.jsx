import { useContext, useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { StatusContext } from "../../context/StatusContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Modal } from "../modal/Modal";
import { CurrentTasks } from "../../pages/user_profile/current_tasks/CurrentTasks";
import { FormUserProfile } from "../../pages/user_profile/form/FormUserProfile";
import { UserProfile } from "../../pages/user_profile/UserProfile";

export const Navbar = () => {
  const { handlerLogout, login } = useContext(AuthContext);
  const { profileHook, tasksHook } = useContext(StatusContext);
  const { status, tasks } = tasksHook;
  const {
    handleOpenProfile,
    handlerOpenWKOn,
    visibleUserProfile,
    visibleFormProfile,
    visibleWO,
    handlerCloseWKOn,
  } = profileHook;
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const onClickHome = () => {
    if (location.pathname === "/home") {
      window.location.reload();
    } else {
      navigate("/home");
    }
  };

  return (
    <>
      <header className="sticky top-0 backdrop-blur-xl bg-black/50 border-b border-white/10 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <button
              className="text-2xl font-medium hover:text-blue-500 transition-all duration-100 cursor-pointer"
              onClick={onClickHome}
            >
              Burnin Task Status
            </button>
            {/* Button Section */}
            <div className="flex items-center gap-2 relative">
              {/* Users */}
              {login.user.isAdmin === 1 && (
                <>
                  <button
                    className="w-auto mr-2 hover:text-blue-500 h-8 rounded-full flex items-center justify-center transition-colors text-sm font-semibold hover:cursor-pointer"
                    aria-label="Users"
                    onClick={() => setIsUsersOpen(!isUsersOpen)}
                  >
                    USERS
                    {!isUsersOpen ? <ChevronDown /> : <ChevronUp />}
                  </button>

                  {isUsersOpen && (
                    <div className="absolute right-24 top-full w-48 rounded-lg shadow-lg bg-black/90 backdrop-blur-xl border border-white/10">
                      <NavLink
                        className="block cursor-pointer rounded-t-md w-full text-left px-4 py-2 hover:bg-white/20 transition-colors"
                        onClick={() => {
                          setIsUsersOpen(false);
                        }}
                        to={"/users-manage"}
                      >
                        Users Manage
                      </NavLink>
                      {/* <button
                        className="block cursor-pointer rounded-b-md w-full text-left px-4 py-2 hover:bg-white/20 transition-colors"
                        onClick={() => {
                          setIsUsersOpen(false);
                        }}
                      >
                        Users Tasks Manage
                      </button> */}
                    </div>
                  )}
                </>
              )}

              <NavLink
                className="w-auto mr-2 hover:text-blue-500 h-8 rounded-full flex items-center justify-center transition-colors text-sm font-semibold hover:cursor-pointer"
                aria-label="Users"
                to={"/activity-logs"}
              >
                ACTIVITY LOG
              </NavLink>

              {/* User */}
              <button
                className="w-8 h-8 rounded-full hover:text-blue-500 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hover:cursor-pointer"
                aria-label="User Profile"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <FaUser className="w-4 h-4" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full w-48 rounded-lg shadow-lg bg-black/90 backdrop-blur-xl border border-white/10">
                  <button
                    className="block cursor-pointer rounded-t-md w-full text-left px-4 py-2 hover:bg-white/20 transition-colors"
                    onClick={() => {
                      handleOpenProfile();
                      setIsProfileOpen(false);
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="block cursor-pointer rounded-b-md w-full text-left px-4 py-2 hover:bg-white/20 transition-colors"
                    onClick={() => {
                      handlerOpenWKOn();
                      setIsProfileOpen(false);
                    }}
                  >
                    My Active Tasks
                  </button>
                </div>
              )}

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
      {visibleUserProfile && (
        <Modal>
          <UserProfile login={login} />
        </Modal>
      )}
      {visibleFormProfile && <FormUserProfile />}
      {visibleWO && (
        <CurrentTasks
          tasks={tasks}
          onClose={handlerCloseWKOn}
          status={status}
        />
      )}
    </>
  );
};
