export const Column = ({ column, tasks }) => {
  return (
    <div
      key={column.id}
      className="group relative lg:h-[780px] h-[380px] rounded-3xl p-6 overflow-auto transition-transform"
    >
      {/* Fondo con gradiente */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${column.color} backdrop-blur-xl`}
      />

      {/* Contenido */}
      <div className="relative h-full flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold mb-2">{column.title}</h3>
          <p className="text-white/60">tasks</p>
        </div>

        {/* Pie de tarjeta con efecto glass */}
        <div className="backdrop-blur-md bg-white/5 -mx-6 -mb-6 p-6 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">See Section</span>
            <button
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hover:cursor-pointer"
              aria-label={`Open ${column.title}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
