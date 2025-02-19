import { useContext, useEffect } from "react";
import { StatusContext } from "../../../context/StatusContext";
import { TableRow } from "./TableRow";

export const TableUsersTracking = () => {
  const { usersHook, tasksHook } = useContext(StatusContext);
  const { users, getUsers } = usersHook;
  const { working_on, getWorkingOnTasks, tasks, getTasks } = tasksHook;
  useEffect(() => {
    getUsers();
    getTasks();
    getWorkingOnTasks();
  }, []);

  return (
    <div className="overflow-x-auto bg-white/10 border border-white/15 rounded-2xl shadow-md backdrop-blur-xl p-4">
      <table className="w-full text-sm text-white text-center">
        <thead>
          <tr className="border-b border-white/20 text-white/60 text-xs uppercase tracking-wide">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3 text-center">Working On</th>
            <th className="px-4 py-3 text-center">Assigned Tasks</th>
            <th className="px-4 py-3">Area</th>
            <th className="px-4 py-3">Shift</th>
            <th className="px-4 py-3 text-center">Assing Task</th>
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {users.map((user, index) => (
            <TableRow
              key={index}
              user={user}
              working_on={working_on}
              tasks={tasks}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
