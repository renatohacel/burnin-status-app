import { Sheet } from "lucide-react";
import { StatusContext } from "../../context/StatusContext";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { AuthContext } from "../../auth/context/AuthContext";

dayjs.extend(utc);
dayjs.extend(timezone);

const shifts = [
  { id: 1, title: "SHIFT 1" },
  { id: 2, title: "SHIFT 2" },
  { id: 3, title: "SHIFT 3" },
];

const date = dayjs().tz("America/Mexico_City");
const formattedDate = date.format("YYYY-MM-DD");

export const ActivityLogsPage = () => {
  const { login } = useContext(AuthContext);
  const { tasksHook } = useContext(StatusContext);
  const { burninLog, bcLog, getBurninLog, getBCLog, handlerGenerateLogExcel } =
    tasksHook;
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState(formattedDate);
  const [selectedArea, setSelectedArea] = useState(login.user.area);
  useEffect(() => {
    if (login.user.isAdmin === 1) {
      getBurninLog();
      getBCLog();
    } else if (login.user.area === "Burnin") {
      getBurninLog();
    } else if (login.user.area === "BC") {
      getBCLog();
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [burninLog, bcLog, dateFilter, selectedArea]);

  const applyFilters = () => {
    let records = [];

    if (selectedArea === "Burnin") {
      records = [...burninLog];
    } else if (selectedArea === "BC") {
      records = [...bcLog];
    }

    records = records.filter(
      (record) => record.date?.toLowerCase() === dateFilter.toLowerCase()
    );

    setFilteredRecords(records);
  };

  return (
    <div className="h-auto min-h-screen bg-black text-white flex flex-col p-6">
      <main className="container mx-auto flex flex-col gap-6">
        {/* Título y Contenedor de Fecha y Exportación */}
        <h1 className="text-2xl font-semibold text-center">ACTIVITY LOG</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Selector de Fecha */}
          <div className="flex flex-col text-center">
            <label className="text-sm text-white/60 mb-1">Select Date</label>
            <input
              name="date"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white/10 px-4 py-2 rounded-lg border border-white/15 text-white focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Selector de Área (solo para Admins) */}
          {login.user.isAdmin === 1 && (
            <div className="flex flex-col text-center">
              <label className="text-sm text-white/60 mb-1">Select Area</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="bg-black text-white px-4 py-2 rounded-lg border border-white/15 focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
              >
                <option className="bg-black text-white" value="Burnin">
                  Burnin
                </option>
                <option className="bg-black text-white" value="BC">
                  BC
                </option>
              </select>
            </div>
          )}

          {/* Botón para Exportar */}
          <button
            className="w-44 hover:text-blue-500 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-sm font-semibold hover:cursor-pointer gap-1 px-4 -mb-[30px]"
            onClick={() => handlerGenerateLogExcel(login.user)}
          >
            SAVE IN EXCEL <Sheet className="w-5" />
          </button>
        </div>

        {/* Contenedor de todas las tablas para alinear bien */}
        <div className="grid grid-cols-1 gap-6">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className="bg-white/10 border border-white/15 backdrop-blur-lg rounded-2xl shadow-lg p-6 w-full"
            >
              {/* Título del Turno */}
              <h2 className="text-lg font-semibold text-center text-white/80 mb-6">
                {shift.title} - {selectedArea}
              </h2>

              {/* Tabla */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-center border-collapse table-fixed">
                  {/* Encabezado */}
                  <thead>
                    <tr className="bg-white/10 border-b border-white/20 text-white/70 text-sm uppercase">
                      <th className="px-6 py-3 w-1/3">Activity</th>
                      <th className="px-6 py-3 w-1/3">Description</th>
                      <th className="px-6 py-3 w-1/3">Engineers</th>
                    </tr>
                  </thead>

                  {/* Cuerpo de la Tabla */}
                  <tbody>
                    {filteredRecords.length > 0 ? (
                      filteredRecords
                        .filter((log) => log.shift === shift.id)
                        .map((log, logIndex) => (
                          <tr
                            key={logIndex}
                            className="border-b border-white/10 hover:bg-white/10 transition-all"
                          >
                            <td className="px-6 py-3 font-medium text-white break-words whitespace-normal">
                              {log.activity}
                            </td>
                            <td className="px-6 py-3 text-white/60 break-words whitespace-normal">
                              {log.description}
                            </td>
                            <td className="px-6 py-3 text-white/60 break-words whitespace-normal">
                              {log.engineers}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="px-6 py-3 text-center text-white/50"
                        >
                          No records available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
