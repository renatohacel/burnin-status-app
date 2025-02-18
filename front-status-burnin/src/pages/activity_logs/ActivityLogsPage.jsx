import { Sheet } from "lucide-react";

export const ActivityLogsPage = () => {
  return (
    <div className="h-auto bg-black text-white flex flex-col">
      <main className="container mx-auto px-4 py-2 flex-1">
        <div className="flex justify-end mb-4 gap-4">
          <button className="w-38 hover:text-blue-500 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-sm font-semibold hover:cursor-pointer text-nowrap gap-1">
            SAVE IN EXCEL <Sheet className="ml-1 w-5 mb-[2px]" />
          </button>
        </div>
      </main>
    </div>
  );
};
