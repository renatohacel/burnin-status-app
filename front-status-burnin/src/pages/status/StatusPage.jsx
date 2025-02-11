import { useContext, useEffect, useState } from "react";
import { Column } from "../../components/column/Column";
import { COLUMNS } from "../../data/data.index";
import { StatusContext } from "../../context/StatusContext";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { TaskCard } from "../../components/task/TaskCard";
import { Plus } from "lucide-react";

import { AuthContext } from "../../auth/context/AuthContext";
import { Modal } from "../../components/modal/Modal";
import { TaskForm } from "./taskForm/TaskForm";
// Con plugin para zona horaria
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export const StatusPage = () => {
  const { login } = useContext(AuthContext);
  const { tasksHook } = useContext(StatusContext);
  const {
    tasks,
    status,
    getTasks,
    updateTaskState,
    getTaskStatus,
    visibleForm,
    handlerOpenForm,
    editing,
  } = tasksHook;

  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    getTasks();
    getTaskStatus();
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

    // Fecha/hora local con Day.js
    const date = dayjs().tz("America/Mexico_City");
    const formattedDate = date.format("YYYY-MM-DD");
    const formattedTime = date.format("HH:mm:ss");

    const taskStatuses = status.filter((st) => st.task_id === taskId);

    const lastStatus =
      taskStatuses.length > 0
        ? taskStatuses.reduce((latest, current) => {
            const latestDate = new Date(`${latest.date} ${latest.time}`);
            const currentDate = new Date(`${current.date} ${current.time}`);
            return currentDate > latestDate ? current : latest;
          })
        : null;

    const lastStatusId = lastStatus ? lastStatus.id : null;

    updateTaskState({
      id: taskId,
      status: newStatus,
      date: formattedDate,
      time: formattedTime,
      updated_by: login.user.name,
      status_id: lastStatusId,
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
          <button
            onClick={handlerOpenForm}
            className="w-28 hover:text-blue-500 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-sm font-semibold hover:cursor-pointer text-nowrap"
          >
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
                status={status}
              />
            ))}

            <DragOverlay>
              {activeTask ? (
                <TaskCard
                  task={activeTask}
                  color={activeColor}
                  activeId={null}
                  status={status.filter((st) => st.task_id === activeTask.id)}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>
      {visibleForm && (
        <Modal>
          <TaskForm formTitle={editing ? "Update Task" : "Add New Task"} />
        </Modal>
      )}
    </div>
  );
};
