import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import Swal from "sweetalert2";

const initialLoginForm = {
  username: "",
  password: "",
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const LoginPage = () => {
  const { handlerLogin } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;

  const onInputChange = ({ target: { name, value } }) => {
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      Toast.fire({
        title: "All fields are required",
        icon: "warning",
      });
      return;
    }
    handlerLogin({ username, password });
    setLoginForm(initialLoginForm);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-md bg-gray-800/80 border border-gray-700 p-8 rounded-md shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-2 opacity-70">
          <img
            src="/ingrasys-logo.webp"
            alt="ingrasys_logo"
            className="w-20 opacity-45"
          />
        </div>

        {/* Títles */}
        <h1 className="text-3xl font-semibold text-center text-gray-100 mb-5">
          BURNIN STATUS
        </h1>
        <h2 className="text-xl text-gray-300 font-medium text-center mb-8">
          Log In
        </h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Username */}
          <div className="flex items-center gap-2">
            <label className="text-gray-400">
              <FaUser />
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              name="username"
              value={username}
              onChange={onInputChange}
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-2">
            <label className="text-gray-400">
              <MdOutlinePassword />
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-500 transition-colors focus:outline-none hover:cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
