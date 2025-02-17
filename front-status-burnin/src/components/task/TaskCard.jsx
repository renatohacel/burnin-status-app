import { useDraggable } from "@dnd-kit/core";
import { Eye, Pencil, Pin, PinOff, Trash } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../context/StatusContext";
import { AuthContext } from "../../auth/context/AuthContext";

export const TaskCard = ({ task, color, activeId, status }) => {
  const { login } = useContext(AuthContext);
  const { tasksHook } = useContext(StatusContext);
  const {
    handlerTaskSelected,
    handlerDeleteTask,
    handlerTaskDetail,
    handlerAddWorkingOn,
    handlerDeleteWorkingOn,
    getWorkingOnTasks,
    working_on,
  } = tasksHook;

  useEffect(() => {
    getWorkingOnTasks();
  }, []);

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

  const onAddWorkTask = () => {
    if (
      !working_on.some(
        (wkon) => wkon.task_id === task.id && wkon.user_id === login.user.id
      )
    ) {
      handlerAddWorkingOn({ task_id: task.id, user_id: login.user.id });
    } else {
      const current_working_on = working_on.filter(
        (wkon) => wkon.task_id === task.id && wkon.user_id === login.user.id
      );
      handlerDeleteWorkingOn(current_working_on[0].id);
    }
  };

  const shouldShowPulse = working_on.some(
    (wkon) => wkon.task_id === task.id && wkon.user_id === login.user.id
  );

  return (
    <div
      className={`cursor-grab rounded-3xl bg-gradient-to-br ${color} p-4 shadow-sm relative`}
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {shouldShowPulse && (
        <div className="absolute top-0 right-0 transform translate-x-1/10 -translate-y-1/100 w-3 h-3 bg-amber-500 rounded-full pulse"></div>
      )}
      <div className="flex justify-between">
        <h3 className="font-medium text-neutral-100/90">{task.title}</h3>
        <div className="flex gap-2 items-start">
          <button
            className="text-white/20 hover:text-white/40 cursor-pointer"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              onAddWorkTask();
            }}
          >
            {shouldShowPulse ? (
              <PinOff className="w-[15px] h-auto mb-[6px]" />
            ) : (
              <Pin className="w-[15px] h-auto mb-[6px]" />
            )}
          </button>
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
                area: task.area,
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
      <p className="text-xs text-white/60">{task.area}</p>
      <p className="mt-2 text-white/60">{task.description}</p>
      <p className="mt-2 text-xs text-white/60">
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
