import { useTasks } from "../hooks/useTaks";
import { useUserProfile } from "../hooks/useUserProfile";
import { StatusContext } from "./StatusContext";

export const StatusProvider = ({ children }) => {
  const tasksHook = useTasks();
  const profileHook = useUserProfile();
  return (
    <StatusContext.Provider
      value={{
        tasksHook,
        profileHook,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
