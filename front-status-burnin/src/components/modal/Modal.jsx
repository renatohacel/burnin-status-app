import { useContext } from "react";
import { StatusContext } from "../../context/StatusContext";

export const Modal = ({ children }) => {
  const { tasksHook } = useContext(StatusContext);
  const { handlerCloseForm } = tasksHook;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handlerCloseForm}
    >
      <div
        className="
          relative w-[90%] max-w-md p-6 rounded-3xl 
          border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10
          text-white ios-appear
        "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
