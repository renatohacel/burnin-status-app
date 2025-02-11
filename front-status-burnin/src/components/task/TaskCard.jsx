import { useDraggable } from "@dnd-kit/core";
import { Pencil } from "lucide-react";

export const TaskCard = ({ task, color, activeId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: activeId === task.id ? 0 : 1,
  };

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
        <button className="text-white/20 hover:text-white/40 cursor-pointer">
          <Pencil className="w-[15px] h-auto mb-[6px]" />
        </button>
      </div>
      <p className="mt-2 text-white/60">{task.description}</p>
      <p className="mt-2 text-sm text-white/60">
        Last change at: {task.date} / {task.time}hrs
      </p>
      <p className="mt-2 text-sm text-white/60">By: {task.created_by}</p>
    </div>
  );
};
