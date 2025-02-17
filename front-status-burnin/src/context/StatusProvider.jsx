import { useGeneral } from "../hooks/useGeneral";
import { useTasks } from "../hooks/useTaks";
import { useUserProfile } from "../hooks/useUserProfile";
import { useUsers } from "../hooks/useUsers";
import { StatusContext } from "./StatusContext";

export const StatusProvider = ({ children }) => {
  const tasksHook = useTasks();
  const profileHook = useUserProfile();
  const usersHook = useUsers();
  const generalHook = useGeneral();
  return (
    <StatusContext.Provider
      value={{
        tasksHook,
        profileHook,
        usersHook,
        generalHook,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
