import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../../context/StatusContext";
import { AuthContext } from "../../../auth/context/AuthContext";
// Con plugin para zona horaria
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export const TaskForm = ({ formTitle }) => {
  const { login } = useContext(AuthContext);
  const { tasksHook } = useContext(StatusContext);
  const { initialTaskForm, taskSelected, handlerAddTask } = tasksHook;

  const [taskForm, setTaskForm] = useState(initialTaskForm);

  const { id, title, description, status } = taskForm;

  useEffect(() => {
    setTaskForm({ ...taskSelected });
  }, [taskSelected]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Fecha/hora local con Day.js
    const date = dayjs().tz("America/Mexico_City");
    const formattedDate = date.format("YYYY-MM-DD");
    const formattedTime = date.format("HH:mm:ss");

    const formData = {
      ...taskForm,
      date: formattedDate,
      time: formattedTime,
      created_by: login.user.name,
    };

    handlerAddTask(formData);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full max-w-md p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5 text-white"
    >
      <h2 className="text-2xl font-semibold mb-6">{formTitle}</h2>

      {/* Campo: Título */}
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 text-white/80">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={onInputChange}
          className="w-full px-4 py-2 bg-black/30 text-white placeholder-gray-400 border border-white/10 rounded-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Campo: Descripción */}
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 text-white/80">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="Enter a description..."
          value={description}
          onChange={onInputChange}
          className="w-full px-4 py-2 bg-black/30 text-white placeholder-gray-400 border border-white/10 rounded-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Campo: Status */}
      <div className="mb-6">
        <label htmlFor="status" className="block mb-1 text-white/80">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={onInputChange}
          className="w-full px-4 py-2  bg-black/30 text-white border border-white/10 rounded-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        >
          <option value="TODO">TODO</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="STOPPED">STOPPED</option>
          <option value="FINISHED">FINISHED</option>
        </select>
      </div>

      {id === 0 ? (
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition-colors focus:outline-none font-medium cursor-pointer"
        >
          Add Task
        </button>
      ) : (
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-amber-600 hover:bg-amber-500 transition-colors focus:outline-none font-medium cursor-pointer"
        >
          Update Task
        </button>
      )}
    </form>
  );
};
