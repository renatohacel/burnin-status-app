import { useContext, useEffect } from "react";
import { TableRow } from "./TableRow";
import { StatusContext } from "../../../context/StatusContext";

export const TableUsers = () => {
  const { usersHook } = useContext(StatusContext);
  const { users, getUsers } = usersHook;

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="overflow-x-auto bg-white/10 border border-white/15 rounded-2xl shadow-md backdrop-blur-xl p-4">
      <table className="w-full text-sm text-white text-center">
        <thead>
          <tr className="border-b border-white/20 text-white/60 text-xs uppercase tracking-wide">
            <th className="px-4 py-3">Username</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Employee No.</th>
            <th className="px-4 py-3">Area</th>
            <th className="px-4 py-3">Shift</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {users.map((user, index) => (
            <TableRow key={index} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
