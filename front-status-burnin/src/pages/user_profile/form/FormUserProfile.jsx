import { useContext, useState } from "react";
import { StatusContext } from "../../../context/StatusContext";
import { AuthContext } from "../../../auth/context/AuthContext";

export const FormUserProfile = () => {
  const { profileHook } = useContext(StatusContext);
  const { login } = useContext(AuthContext);
  const { handleCloseFormProfile, errors, handleEditProfile } = profileHook;
  const [profileForm, setProfileForm] = useState({
    id: login.user.id,
    username: login.user.username,
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (profileForm.password === "") {
      const formData = {
        id: profileForm.id,
        username: profileForm.username,
      };

      handleEditProfile(formData);
    } else {
      handleEditProfile(profileForm);
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={() => {
        handleCloseFormProfile();
      }}
    >
      <div
        className="
          relative w-[90%] max-w-md p-6 rounded-3xl 
          border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10
          text-white ios-appear
        "
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={onSubmit}
          className="relative w-full max-w-md p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5 text-white"
        >
          <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>

          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 text-white/80">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={profileForm.username}
              onChange={onInputChange}
              className="w-full px-4 py-2 bg-black/30 text-white placeholder-gray-400 border border-white/10 rounded-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.username}
          </p>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-white/80">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={profileForm.password}
              onChange={onInputChange}
              className="w-full px-4 py-2 bg-black/30 text-white placeholder-gray-400 border border-white/10 rounded-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <p
              className="text-white/45 italic text-center"
              style={{ fontSize: "0.9rem" }}
            >
              Leave password blank to keep current password
            </p>
          </div>

          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.username}
          </p>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-amber-600 hover:bg-amber-500 transition-colors focus:outline-none font-medium cursor-pointer"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};
