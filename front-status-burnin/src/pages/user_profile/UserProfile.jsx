import { Pencil } from "lucide-react";
import { useContext } from "react";
import { StatusContext } from "../../context/StatusContext";
import { FormUserProfile } from "./form/FormUserProfile";

export const UserProfile = ({ login }) => {
  const { username, name, num_employee, shift } = login.user;
  const { profileHook } = useContext(StatusContext);
  const { handleOpenFormProfile, visibleFormProfile } = profileHook;

  return (
    <>
      <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-lg shadow-lg text-center text-white">
        {/* Username con icono */}
        <div className="mb-3">
          <p className="text-sm font-semibold text-white/70">Username</p>
          <div className="flex items-center text-center justify-center gap-2">
            <p className="text-base font-medium text-white">{username}</p>
            <Pencil
              className="w-4 h-4 text-white/50 hover:text-white transition-colors cursor-pointer"
              onClick={() => handleOpenFormProfile()}
            />
          </div>
        </div>
        {/* Name */}
        <div className="mb-3">
          <p className="text-sm font-semibold text-white/70">Full Name</p>
          <p className="text-base font-medium text-white/60">{name}</p>
        </div>

        {/* Employee Number */}
        <div>
          <div className="mb-3">
            <p className="text-sm font-semibold text-white/70">Employee No.</p>
            <p className="text-base font-medium text-white/60">
              {num_employee}
            </p>
          </div>
        </div>

        {/* Shift */}
        <div>
          <p className="text-sm font-semibold text-white/70">Shift</p>
          <p className="text-base font-medium text-white/60">{shift}</p>
        </div>
      </div>
    </>
  );
};
