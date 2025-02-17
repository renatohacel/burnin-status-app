import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5"; // Ícono de cerrar
import { FaClipboardList } from "react-icons/fa";
import { StatusContext } from "../../context/StatusContext";

export const TaskDetailModal = () => {
  const { tasksHook } = useContext(StatusContext);
  const {
    taskSelected,
    status: allStatus,
    handlerCloseTaskDetail,
    getTaskStatus,
  } = tasksHook;
  const { title, description, status, date, time, area } = taskSelected;
  const [statusSelected, setStatusSelected] = useState([]);

  useEffect(() => {
    getTaskStatus();
    setStatusSelected(
      allStatus.filter((change) => change.task_id === taskSelected.id)
    );
  }, [taskSelected]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handlerCloseTaskDetail}
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
        {/* Botón de Cerrar */}
        <button
          className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors text-xl"
          onClick={handlerCloseTaskDetail}
          aria-label="Close"
        >
          <IoClose />
        </button>

        {/* Ícono principal */}
        <div className="flex justify-center mb-4">
          <FaClipboardList
            className={`text-4xl ${getStatusColor(status).icon}`}
          />
        </div>

        {/* Título */}
        <h2 className="text-xl font-semibold text-center">{title}</h2>
        {/* Area */}
        <div className="text-xs text-white/70 text-center mb-3">{area}</div>

        {/* Estado (badge) */}
        <div
          className={`text-sm font-medium text-center mb-4 px-3 py-1 rounded-full ${
            getStatusColor(status).badge
          }`}
        >
          {status}
        </div>

        {/* Descripción */}
        <p className="text-sm text-white/70 text-center mb-4">{description}</p>

        {/* Información Adicional */}
        <div className="border-t border-white/20 pt-3 text-xs text-center text-white/50">
          {`Created on: ${date} at ${time}hrs`}
        </div>

        {/* 📌 Historial de Cambios */}
        {statusSelected.length > 0 && (
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-white/80 mb-2">
              Status History
            </h3>
            <ul className="space-y-2 max-h-[200px] overflow-auto custom-scrollbar">
              {statusSelected.map((change, index) => (
                <li
                  key={index}
                  className="bg-white/10 p-3 rounded-lg text-sm text-white/80 border border-white/15"
                >
                  {/* Input (encima, resalta más) */}
                  <p className="text-sm font-semibold text-white/70 uppercase tracking-wide">
                    {change.input}
                  </p>

                  {/* Value (debajo, más sutil) */}
                  <p className="text-xs font-medium text-white/50 mt-0.5">
                    {change.value}
                  </p>

                  {/* Información secundaria (usuario y fecha/hora) */}
                  <div className="flex justify-between text-xs text-white/40 mt-2">
                    <span>{change.updated_by}</span>
                    <span>{`${change.date} at ${change.time}hrs`}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "TO DO":
      return { badge: "bg-gray-700 text-gray-300", icon: "text-gray-300" };
    case "IN PROCESS":
      return { badge: "bg-blue-700 text-blue-300", icon: "text-blue-300" };
    case "STOPPED":
      return { badge: "bg-red-700 text-red-300", icon: "text-red-300" };
    case "FINISHED":
      return { badge: "bg-green-700 text-green-300", icon: "text-green-300" };
    default:
      return { badge: "bg-gray-600 text-gray-200", icon: "text-gray-200" };
  }
};
