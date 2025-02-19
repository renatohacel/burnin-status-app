import { UserPen } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useContext, useState } from "react";
import { StatusContext } from "../../../context/StatusContext";

export const TableRow = ({ user, working_on, tasks }) => {
  const { tasksHook } = useContext(StatusContext);
  const { handlerUserTracking } = tasksHook;
  const { id, name, shift, area } = user;
  const [tooltipOpen, setTooltipOpen] = useState(null);

  // Tareas en las que el usuario está trabajando
  const taskCount = working_on.filter((wkon) => wkon.user_id === id).length;
  const userTasks = working_on
    .filter((wkon) => wkon.user_id === id)
    .map((wkon) => tasks.find((task) => task.id === wkon.task_id))
    .filter(Boolean);

  // Tareas asignadas al usuario
  const assignedCount = tasks.filter((task) => task.assigned_to === id).length;
  const assignedTasks = tasks
    .filter((task) => task.assigned_to === id)
    .filter(Boolean);

  // Función para definir el color de la barra de progreso
  const getProgressColor = (count) => {
    if (count < 3) return "bg-green-500";
    if (count >= 3 && count <= 4) return "bg-orange-400";
    return "bg-red-500";
  };

  const progressPercentage = (count) => Math.min((count / 6) * 100, 100);

  return (
    <tr className="border-b border-white/10 hover:bg-white/10 transition-all text-center">
      <td className="px-4 py-3">{name}</td>

      {/* Barra de Progreso: "Working On" */}
      <td
        className="px-4 py-3 cursor-pointer relative"
        data-tooltip-id={`tooltip-wk-${id}`}
        onMouseEnter={() => setTooltipOpen(`wk-${id}`)}
        onMouseLeave={() => setTooltipOpen(null)}
      >
        <div className="w-full bg-white/20 rounded-full h-2 relative">
          <div
            className={`h-full ${getProgressColor(
              taskCount
            )} rounded-full transition-all`}
            style={{ width: `${progressPercentage(taskCount)}%` }}
          ></div>
        </div>
        <span className="text-xs text-white/60 mt-1 block">
          {taskCount} Tasks
        </span>

        {userTasks.length > 0 && tooltipOpen === `wk-${id}` && (
          <Tooltip
            id={`tooltip-wk-${id}`}
            place="top"
            delayShow={50}
            delayHide={150}
            className="!bg-black !text-white !px-4 !py-3 !rounded-lg !shadow-lg !opacity-100 !z-[9999]"
            style={{ transform: "translateY(-10px)", whiteSpace: "nowrap" }}
          >
            <div className="text-xs font-medium">
              <strong>Working On:</strong>
              <ul className="mt-1">
                {userTasks.map((task) => (
                  <li key={task.id} className="text-white/80">
                    • {task.title}
                  </li>
                ))}
              </ul>
            </div>
          </Tooltip>
        )}
      </td>

      {/* Barra de Progreso: "Assigned Tasks" */}
      <td
        className="px-4 py-3 cursor-pointer relative"
        data-tooltip-id={`tooltip-assigned-${id}`}
        onMouseEnter={() => setTooltipOpen(`assigned-${id}`)}
        onMouseLeave={() => setTooltipOpen(null)}
      >
        <div className="w-full bg-white/20 rounded-full h-2 relative">
          <div
            className={`h-full ${getProgressColor(
              assignedCount
            )} rounded-full transition-all`}
            style={{ width: `${progressPercentage(assignedCount)}%` }}
          ></div>
        </div>
        <span className="text-xs text-white/60 mt-1 block">
          {assignedCount} Tasks
        </span>

        {assignedTasks.length > 0 && tooltipOpen === `assigned-${id}` && (
          <Tooltip
            id={`tooltip-assigned-${id}`}
            place="top"
            delayShow={50}
            delayHide={150}
            className="!bg-black !text-white !px-4 !py-3 !rounded-lg !shadow-lg !opacity-100 !z-[9999]"
            style={{ transform: "translateY(-10px)", whiteSpace: "nowrap" }}
          >
            <div className="text-xs font-medium">
              <strong>Assigned Tasks:</strong>
              <ul className="mt-1">
                {assignedTasks.map((task) => (
                  <li key={task.id} className="text-white/80">
                    • {task.title}
                  </li>
                ))}
              </ul>
            </div>
          </Tooltip>
        )}
      </td>

      {/* Área */}
      <td className="px-4 py-3">{area}</td>

      {/* Turno */}
      <td className="px-4 py-3">{shift}</td>

      {/* Acciones */}
      <td className="px-4 py-3 flex justify-center gap-2">
        <button
          className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-colors cursor-pointer"
          onClick={() =>
            handlerUserTracking({
              assigned_to: { value: user.id, label: user.name },
            })
          }
        >
          <UserPen className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};
