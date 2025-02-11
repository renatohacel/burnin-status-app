import { useState } from "react";
import { Column } from "../../components/column/Column";

export const StatusPage = () => {
  // Ejemplo de contenedores
  const columns = [
    {
      id: 1,
      title: "TODO",
      color: "from-gray-900/80 to-gray-800/50",
    },
    {
      id: 2,
      title: "PROCESSING",
      color: "from-blue-900/80 to-blue-800/50",
    },

    {
      id: 3,
      title: "STOPPED",
      color: "from-red-900/80 to-red-800/50",
    },
    {
      id: 4,
      title: "FINISHED",
      color: "from-green-900/80 to-green-800/50",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Main Content (4 Contenedores) */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </div>
      </main>
    </div>
  );
};
