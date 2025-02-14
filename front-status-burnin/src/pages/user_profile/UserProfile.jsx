import { Pencil } from "lucide-react";
import { useContext } from "react";
import { StatusContext } from "../../context/StatusContext";

export const UserProfile = ({ login }) => {
  const { username, name, num_employee, shift, area } = login.user;
  const { profileHook } = useContext(StatusContext);
  const { handleOpenFormProfile } = profileHook;

  return (
    <>
      <h3 className="font-medium text-neutral-100/60 mb-4">My Profile</h3>
      <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-lg shadow-lg text-center text-white grid grid-cols-3">
        {/* Username con icono */}
        <div className="mb-4 col-span-1 ml-10">
          <p className="text-sm font-semibold text-white/70">Username</p>
          <div className="flex items-center justify-center gap-2 ml-4">
            <p className="text-base font-medium text-white">{username}</p>
            <Pencil
              className="w-4 h-4 text-white/50 hover:text-white transition-colors cursor-pointer"
              onClick={() => handleOpenFormProfile()}
            />
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-4 col-span-2 ml-10">
          <p className="text-sm font-semibold text-white/70">Full Name</p>
          <p className="text-base font-medium text-white/60">{name}</p>
        </div>

        {/* Employee Number, Area, and Shift */}
        <div className="flex justify-between gap-4 text-center col-span-3">
          <div className="mb-3">
            <p className="text-sm font-semibold text-white/70">Employee No.</p>
            <p className="text-base font-medium text-white/60">
              {num_employee}
            </p>
          </div>
          <div className="mb-3 mr-10">
            <p className="text-sm font-semibold text-white/70">Area</p>
            <p className="text-base font-medium text-white/60">{area}</p>
          </div>
          <div className="mb-3">
            <p className="text-sm font-semibold text-white/70">Shift</p>
            <p className="text-base font-medium text-white/60">{shift}</p>
          </div>
        </div>
      </div>
    </>
  );
};
