import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../../context/StatusContext";
import { AuthContext } from "../../../auth/context/AuthContext";
import Select from "react-select";
// Con plugin para zona horaria
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Swal from "sweetalert2";
dayjs.extend(utc);
dayjs.extend(timezone);

// Mezcla para Toast "top-end"
export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  customClass: {
    // Clases personalizadas que usaremos en CSS
    popup: "ios-toast-popup",
    title: "ios-toast-title",
    timerProgressBar: "ios-toast-progress",
  },
  didOpen: (toast) => {
    // Pausar / reanudar el timer al pasar el ratón
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
  showClass: {
    popup: "ios-toast-show",
  },
  hideClass: {
    popup: "ios-toast-hide",
  },
});

export const TaskForm = ({ formTitle }) => {
  const { login } = useContext(AuthContext);
  const { tasksHook, usersHook } = useContext(StatusContext);
  const { initialTaskForm, taskSelected, handlerAddTask } = tasksHook;
  const { users, getUsers } = usersHook;

  const [taskForm, setTaskForm] = useState(initialTaskForm);
  const { id, title, description, status, area } = taskForm;
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUsers();
    setTaskForm({ ...taskSelected });
    setSelectedUser(taskSelected.assigned_to);
  }, [taskSelected]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };
  //options users
  const userOptions = [
    { value: 0, label: "All Team" },
    ...users.map((user) => ({ value: user.id, label: user.name })),
  ];

  const onUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
    setTaskForm({
      ...taskForm,
      assigned_to: selectedOption?.value || 0,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !status) {
      Toast.fire({
        icon: "warning",
        title: "Title is required",
      });
      return;
    }
    // Fecha/hora local con Day.js
    const date = dayjs().tz("America/Mexico_City");
    const formattedDate = date.format("YYYY-MM-DD");
    const formattedTime = date.format("HH:mm:ss");

    if (id === 0) {
      const formData = {
        ...taskForm,
        assigned_to: selectedUser?.value,
        title: title.toUpperCase(),
        date: formattedDate,
        time: formattedTime,
        created_by: login.user.name,
      };
      handlerAddTask(formData);
    } else if (id > 0) {
      const formData = {
        ...taskForm,
        assigned_to: selectedUser?.value,
        title: title.toUpperCase(),
        date: formattedDate,
        time: formattedTime,
        updated_by: login.user.name,
      };
      handlerAddTask(formData);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full max-w-md p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5 text-white"
    >
      <h2 className="text-2xl font-semibold mb-6">{formTitle}</h2>

      <div className="mb-2">
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

      <div className="mb-2">
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
      {login.user.isAdmin === 1 && (
        <div className="mb-2">
          <label htmlFor="description" className="block mb-1 text-white/80">
            Asigned To
          </label>
          <Select
            name="assigned_to"
            options={userOptions}
            value={selectedUser}
            onChange={onUserChange}
            placeholder="Select user"
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                padding: "2px",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                borderRadius: "8px",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
                color: "white",
              }),
            }}
          />
        </div>
      )}

      <div className="mb-2">
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
          <option value="TO DO">TO DO</option>
          <option value="IN PROCESS">IN PROCESS</option>
          <option value="STOPPED">STOPPED</option>
          <option value="FINISHED">FINISHED</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="status" className="block mb-1 text-white/80">
          Area
        </label>
        <select
          id="area"
          name="area"
          value={area}
          onChange={onInputChange}
          className="w-full px-4 py-2  bg-black/30 text-white border border-white/10 rounded-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        >
          <option value="Burnin" className="bg-black text-white">
            Burnin
          </option>
          <option value="BC" className="bg-black text-white">
            BC
          </option>
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
