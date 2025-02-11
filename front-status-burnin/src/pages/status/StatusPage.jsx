import { useContext, useEffect, useState } from "react";
import { Column } from "../../components/column/Column";
import { COLUMNS } from "../../data/data.index";
import { StatusContext } from "../../context/StatusContext";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { TaskCard } from "../../components/task/TaskCard";
import { Plus } from "lucide-react";
import dayjs from "dayjs";
// Con plugin para zona horaria
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export const StatusPage = () => {
  const { tasksHook } = useContext(StatusContext);
  const { tasks, getTasks, updateTaskState } = tasksHook;

  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const handlerDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handlerDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const date = dayjs().tz("America/Mexico_City");
    const formattedDate = date.format("YYYY-MM-DD");
    const formattedTime = date.format("HH:mm:ss");

    updateTaskState({
      id: taskId,
      status: newStatus,
      date: formattedDate,
      time: formattedTime,
    });
  };

  const activeTask = tasks.find((task) => task.id === activeId);

  const activeColor = activeTask
    ? COLUMNS.find((col) => col.title === activeTask.status)?.color
    : "";

  return (
    <div className="h-auto bg-black text-white flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="flex justify-end mb-4">
          <button className="w-28 hover:text-blue-500 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-sm font-semibold hover:cursor-pointer text-nowrap">
            ADD TASK <Plus />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DndContext onDragStart={handlerDragStart} onDragEnd={handlerDragEnd}>
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.title)}
              />
            ))}

            <DragOverlay>
              {activeTask ? (
                <TaskCard
                  task={activeTask}
                  color={activeColor}
                  activeId={null}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>
    </div>
  );
};
