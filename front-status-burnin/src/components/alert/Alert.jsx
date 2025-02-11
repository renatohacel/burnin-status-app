export function Alert({ isOpen = true, title, message, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center 
        bg-black/60 backdrop-blur-sm
      "
      onClick={onClose} /* Cierra si se hace click fuera */
    >
      {/* Contenido de la alerta, evitamos que el click se propague */}
      <div
        className="
          relative w-[90%] max-w-sm p-4 
          bg-white/10 backdrop-blur-xl border border-white/20 
          rounded-2xl shadow-2xl text-white 
          ios-appear
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Título */}
        <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>

        {/* Mensaje */}
        <p className="text-center mb-4">{message}</p>

        {/* Botones */}
        <div className="flex border-t border-white/20 divide-x divide-white/20">
          {/* Botón "Cancel" */}
          <button
            className="
              w-1/2 py-2 text-center hover:bg-white/10 
              transition-colors text-blue-400
            "
            onClick={onClose}
          >
            Cancel
          </button>

          {/* Botón "OK" */}
          <button
            className="
              w-1/2 py-2 text-center hover:bg-white/10 
              transition-colors text-blue-400
            "
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
