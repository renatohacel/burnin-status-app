import { useDraggable } from "@dnd-kit/core";
import { Eye, Pencil, Trash } from "lucide-react";
import { useContext } from "react";
import { StatusContext } from "../../context/StatusContext";

export const TaskCard = ({ task, color, activeId, status }) => {
  const { tasksHook } = useContext(StatusContext);
  const { handlerTaskSelected, handlerDeleteTask, handlerTaskDetail } =
    tasksHook;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: activeId === task.id ? 0 : 1,
  };

  const lastStatus =
    status && status.length > 0
      ? status.reduce((latest, current) => {
          const latestDate = new Date(`${latest.date} ${latest.time}`);
          const currentDate = new Date(`${current.date} ${current.time}`);
          return currentDate > latestDate ? current : latest;
        })
      : null;

  return (
    <div
      className={`cursor-grab rounded-3xl bg-gradient-to-br ${color} p-4 shadow-sm`}
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <div className="flex justify-between">
        <h3 className="font-medium text-neutral-100/90">{task.title}</h3>
        <div className="flex gap-2">
          <button
            className="text-white/20 hover:text-white/40 cursor-pointer"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              handlerTaskDetail({ task, status });
            }}
          >
            <Eye className="w-[15px] h-auto mb-[6px]" />
          </button>
          <button
            className="text-white/20 hover:text-white/40 cursor-pointer"
            onPointerDown={(e) => e.stopPropagation()}
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
            onPointerDown={(e) => e.stopPropagation()}
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
        Last change at:{" "}
        {lastStatus
          ? `${lastStatus.date} / ${lastStatus.time}hrs`
          : "No status yet"}
      </p>
      <p className="mt-2 text-sm text-white/60">
        By: {lastStatus ? lastStatus.updated_by : ""}
      </p>
    </div>
  );
};
