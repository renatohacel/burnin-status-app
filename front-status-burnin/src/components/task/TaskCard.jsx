import { Pencil } from "lucide-react";
export const TaskCard = ({ task, color }) => {
  return (
    <div
      className={`cursor-grab rounded-3xl bg-gradient-to-br ${color} p-4 shadow-sm hover:shadow-lg mt-2 mb-2`}
    >
      <div className="flex justify-between">
        <h3 className="font-medium text-neutral-100/90">{task.title}</h3>
        <button className="text-white/20 hover:text-white/40 cursor-pointer">
          <Pencil className="w-[15px] h-auto mb-[6px]" />
        </button>
      </div>
      <p className="mt-2 text-white/60">{task.description}</p>
      <p className="mt-2 text-sm text-white/60">
        Last personal to change: {task.created_by}
      </p>
    </div>
  );
};
