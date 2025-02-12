import { TaskCard } from "../task/TaskCard";
import { useDroppable } from "@dnd-kit/core";

export const Column = ({ column, tasks, status }) => {
  const { setNodeRef } = useDroppable({
    id: column.title,
  });

  return (
    <div
      key={column.id}
      className="relative lg:h-[580px] h-[380px] rounded-3xl p-6 overflow-hidden transition-transform"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${column.color} backdrop-blur-xl z-0`}
      />
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-2xl font-semibold mb-2">{column.title}</h3>
        <div
          ref={setNodeRef}
          className="flex-1 min-h-0 overflow-x-hidden pr-2 custom-scrollbar space-y-2"
        >
          {tasks.map((task) => {
            const taskStatuses = status.filter((st) => st.task_id === task.id);
            return (
              <TaskCard
                key={task.id}
                task={task}
                color={column.color}
                status={taskStatuses}
              />
            );
          })}
        </div>

        <div className="mt-4 backdrop-blur-md bg-white/5 -mx-6 -mb-6 p-6 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">{tasks.length} Tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};
