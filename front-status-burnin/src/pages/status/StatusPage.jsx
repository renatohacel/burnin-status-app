import { useContext, useEffect } from "react";
import { Column } from "../../components/column/Column";
import { COLUMNS } from "../../data/data.index";
import { StatusContext } from "../../context/StatusContext";

export const StatusPage = () => {
  const { tasksHook } = useContext(StatusContext);
  const { tasks, getTasks } = tasksHook;

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="h-auto bg-black text-white flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.title)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
