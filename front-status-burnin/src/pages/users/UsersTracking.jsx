import { useContext } from "react";
import { StatusContext } from "../../context/StatusContext";
import { TableUsersTracking } from "./table_tracking/TableUsersTracking";
import { Modal } from "../../components/modal/Modal";
import { TaskForm } from "../status/taskForm/TaskForm";

export const UsersTracking = () => {
  const { tasksHook } = useContext(StatusContext);

  const { visibleForm } = tasksHook;

  return (
    <div className="h-auto bg-black text-white flex flex-col">
      <main className="container mx-auto px-4 py-2 flex-1">
        <h1 className="text-2xl font-semibold text-center mb-8">
          USERS ACTIVITY TRACKING
        </h1>
        <TableUsersTracking />
      </main>
      {visibleForm && (
        <Modal>
          <TaskForm formTitle={"Add New Task"} />
        </Modal>
      )}
    </div>
  );
};
