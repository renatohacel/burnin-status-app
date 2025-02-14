import { useContext, useEffect } from "react";
import { StatusContext } from "../../../context/StatusContext";
import { AuthContext } from "../../../auth/context/AuthContext";
import { Eye, Pencil, PinOff, Trash } from "lucide-react";

export const CurrentTasks = ({ tasks, onClose, status }) => {
  const { login } = useContext(AuthContext);
  const { tasksHook } = useContext(StatusContext);

  const {
    handlerTaskSelected,
    handlerDeleteTask,
    handlerTaskDetail,
    handlerDeleteWorkingOn,
    getWorkingOnTasks,
    working_on,
  } = tasksHook;

  useEffect(() => {
    getWorkingOnTasks();
  }, []);

  // Filtrar las tareas en las que el usuario está trabajando
  const current_tasks = tasks.filter((task) =>
    working_on.some(
      (wkon) => wkon.task_id === task.id && wkon.user_id === login.user.id
    )
  );

  const onDelete = (task_id) => {
    const current_working_on = working_on.filter(
      (wkon) => wkon.task_id === task_id && wkon.user_id === login.user.id
    );
    handlerDeleteWorkingOn(current_working_on[0].id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Contenedor del Modal */}
      <div
        className="
          relative w-[90%] max-w-md p-6 rounded-3xl
          border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10
          text-white ios-appear
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-medium text-neutral-100/60">My Active Tasks</h3>
        {current_tasks.length > 0 ? (
          current_tasks.map((task) => (
            <div
              key={task.id}
              className={`${
                getStatusColor(task.status).badge
              } rounded-lg p-2 mb-4 mt-4 relative`}
            >
              {/* Círculo Naranja con "X" */}
              <button
                className="absolute cursor-pointer top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500/50 hover:bg-red-500 transition-all duration-200 rounded-full flex items-center justify-center text-white text-[10px]"
                onClick={() => {
                  onDelete(task.id);
                }}
              >
                <PinOff className="w-[12px] h-auto" />
              </button>
              <div className="flex justify-between">
                <h3 className="font-medium text-neutral-100/90">
                  {task.title}
                </h3>
                <div className="flex gap-2 items-center">
                  <button
                    className="text-white/20 hover:text-white/40 cursor-pointer"
                    onClick={() => {
                      const taskStatus = status.filter(
                        (st) => st.task_id === task.id
                      );
                      handlerTaskDetail({ task, status: taskStatus });
                    }}
                  >
                    <Eye className="w-[15px] h-auto mb-[6px]" />
                  </button>
                  <button
                    className="text-white/20 hover:text-white/40 cursor-pointer"
                    onClick={() => {
                      handlerTaskSelected({
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        status: task.status,
                      });
                    }}
                  >
                    <Pencil className="w-[15px] h-auto mb-[6px]" />
                  </button>
                  <button
                    className="text-white/20 hover:text-white/40 cursor-pointer"
                    onClick={() => {
                      handlerDeleteTask(task.id);
                    }}
                  >
                    <Trash className="w-[15px] h-auto mb-[6px]" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-white/60">{task.description}</p>
              <p className="mt-2 text-sm text-white/60">
                Status:{" "}
                <span
                  className={`${
                    getStatusColor(task.status).badge
                  } rounded px-2`}
                >
                  {task.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-white/70 text-center mb-4">
            You are not working on any task now
          </p>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "TO DO":
      return { badge: "bg-gray-700 text-gray-300" };
    case "IN PROCESS":
      return { badge: "bg-blue-700 text-blue-300" };
    case "STOPPED":
      return { badge: "bg-red-700 text-red-300" };
    case "FINISHED":
      return { badge: "bg-green-700 text-green-300" };
    default:
      return { badge: "bg-gray-600 text-gray-200" };
  }
};
