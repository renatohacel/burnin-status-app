import { Plus } from "lucide-react";
import { TaskCard } from "../task/TaskCard";

export const Column = ({ column, tasks }) => {
  return (
    <div
      key={column.id}
      className="relative lg:h-[580px] h-[380px] rounded-3xl p-6 overflow-hidden transition-transform"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${column.color} backdrop-blur-xl z-0`}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold mb-2">{column.title}</h3>
          <button
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors hover:cursor-pointer"
            aria-label={`Open ${column.title}`}
          >
            <Plus />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-auto pr-2 custom-scrollbar space-y-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} color={column.color} />
          ))}
        </div>

        {/* Sección inferior */}
        <div className="mt-4 backdrop-blur-md bg-white/5 -mx-6 -mb-6 p-6 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">See Section</span>
            <button
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hover:cursor-pointer"
              aria-label={`Open ${column.title}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
