import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../../context/StatusContext";
import Swal from "sweetalert2";

export const UsersForm = ({ formTitle }) => {
  const { usersHook, generalHook } = useContext(StatusContext);
  const {
    initialUsersForm,
    errors,
    userSelected,
    handlerAddUser,
    handlerCloseFormUsers,
  } = usersHook;

  const {
    onInputShift,
    onKeyShift,
    onKeyName,
    onInputName,
    onKeyNumEm,
    onInputNumEm,
  } = generalHook;

  const [usersForm, setUsersForm] = useState(initialUsersForm);
  const { id, username, password, name, num_employee, shift, area, isAdmin } =
    usersForm;

  useEffect(() => {
    setUsersForm({ ...userSelected });
  }, [userSelected]);

  const onInputChange = ({ target: { value, name } }) => {
    setUsersForm({ ...usersForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formData;
    if (usersForm.password === "") {
      formData = {
        id,
        username,
        name,
        area,
        num_employee: parseInt(usersForm.num_employee, 10),
        shift: parseInt(usersForm.shift, 10),
        isAdmin: parseInt(usersForm.isAdmin, 10),
      };
    } else {
      formData = {
        ...usersForm,
        area,
        num_employee: parseInt(usersForm.num_employee, 10),
        shift: parseInt(usersForm.shift, 10),
        isAdmin: parseInt(usersForm.isAdmin, 10),
      };
      console.log(formData);
    }
    handlerAddUser(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handlerCloseFormUsers}
    >
      <div
        className="relative w-[90%] max-w-2xl p-6 rounded-3xl border border-white/20 
                   shadow-2xl backdrop-blur-xl bg-white/10 text-white ios-appear"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">{formTitle}</h2>

        {/* Formulario con Grid */}
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Username */}
          <div>
            <label className="block text-white/80">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={onInputChange}
              onKeyDown={onKeyName}
              onInput={onInputName}
              className="input-field"
            />
            <p className="error-text">{errors?.username}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/80">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onInputChange}
              className="input-field"
            />
            <p className="error-text">{errors?.password}</p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-white/80">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={onInputChange}
              className="input-field"
            />
            <p className="error-text">{errors?.name}</p>
          </div>

          {/* Employee Number */}
          <div>
            <label className="block text-white/80">Employee Number</label>
            <input
              name="num_employee"
              type="text"
              placeholder="Employee No."
              value={num_employee}
              onChange={onInputChange}
              onKeyDown={onKeyNumEm}
              onInput={onInputNumEm}
              className="input-field"
            />
            <p className="error-text">{errors?.num_employee}</p>
          </div>

          {/* Shift */}
          <div>
            <label className="block text-white/80">Shift</label>
            <input
              name="shift"
              type="number"
              placeholder="Shift"
              value={shift}
              min={1}
              max={3}
              onChange={onInputChange}
              onKeyDown={onKeyShift}
              onInput={onInputShift}
              className="input-field"
            />
            <p className="error-text">{errors?.shift}</p>
          </div>

          {/* Area */}
          <div>
            <label className="block text-white/80">Area</label>
            <select
              name="area"
              value={area}
              onChange={onInputChange}
              className="input-field"
            >
              <option value="Burnin">Burnin</option>
              <option value="BC">BC</option>
            </select>
            <p className="error-text">{errors?.area}</p>
          </div>

          {/* Type */}
          <div className="md:col-span-2">
            <label className="block text-white/80">Type</label>
            <select
              name="isAdmin"
              value={isAdmin}
              onChange={onInputChange}
              className="input-field"
            >
              <option value={0}>Standard</option>
              <option value={1}>Administrator</option>
            </select>
            <p className="error-text">{errors?.isAdmin}</p>
          </div>

          {/* Botón */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className={`w-full py-2 rounded-md transition-colors font-medium cursor-pointer ${
                id === 0
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-amber-600 hover:bg-amber-500"
              }`}
            >
              {id === 0 ? "Add User" : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
