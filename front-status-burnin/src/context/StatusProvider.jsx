import { useTasks } from "../hooks/useTaks";
import { StatusContext } from "./StatusContext";

export const StatusProvider = ({ children }) => {
  const tasksHook = useTasks();
  return (
    <StatusContext.Provider
      value={{
        tasksHook,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
