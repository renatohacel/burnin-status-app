import { Plus } from "lucide-react";
import { TableUsers } from "./table/TableUsers";
import { useContext } from "react";
import { StatusContext } from "../../context/StatusContext";
import { UsersForm } from "./form/UsersForm";

export const UsersPage = () => {
  const { usersHook } = useContext(StatusContext);
  const { visibleForm, handlerOpenFormUsers, editing } = usersHook;
  return (
    <div className="h-auto bg-black text-white flex flex-col">
      <main className="container mx-auto px-4 py-2 flex-1">
        <div className="flex justify-end mb-4 gap-4">
          <button
            onClick={handlerOpenFormUsers}
            className="w-28 hover:text-blue-500 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-sm font-semibold hover:cursor-pointer text-nowrap"
          >
            ADD USER <Plus />
          </button>
        </div>

        <TableUsers />
      </main>
      {visibleForm && (
        <UsersForm formTitle={editing ? "Update User" : "Add New User"} />
      )}
    </div>
  );
};
