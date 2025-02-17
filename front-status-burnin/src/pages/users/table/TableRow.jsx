import { Pencil, Trash2 } from "lucide-react";
import { useContext } from "react";
import { StatusContext } from "../../../context/StatusContext";

export const TableRow = ({ user }) => {
  const { usersHook } = useContext(StatusContext);
  const { handlerUserSelected, handlerDeleteUser } = usersHook;
  const { id, username, name, num_employee, shift, isAdmin, area } = user;
  return (
    <tr className="border-b border-white/10 hover:bg-white/10 transition-all text-center">
      <td className="px-4 py-3">{username}</td>
      <td className="px-4 py-3">{name}</td>
      <td className="px-4 py-3">{num_employee}</td>
      <td className="px-4 py-3">{area}</td>
      <td className="px-4 py-3">{shift}</td>
      <td className="px-4 py-3">
        {isAdmin === 1 ? "Administrator" : "Standard"}
      </td>
      <td className="px-4 py-3 flex justify-center gap-2">
        {/* Botón Editar */}
        <button
          className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-colors cursor-pointer"
          onClick={() =>
            handlerUserSelected({
              id,
              username,
              name,
              num_employee,
              area,
              shift,
              isAdmin,
            })
          }
        >
          <Pencil className="w-4 h-4" />
        </button>

        {/* Botón Eliminar */}
        <button
          className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors cursor-pointer"
          onClick={() => handlerDeleteUser(id)}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};
