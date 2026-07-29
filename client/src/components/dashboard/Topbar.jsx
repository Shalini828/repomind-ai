import { Search, Bell, Plus } from "lucide-react";

function Topbar() {
  return (
    <header className="h-20 border-b border-slate-800 bg-[#0F172A] flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm">
          Welcome back, Shalini 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2 w-72">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search repositories..."
            className="bg-transparent outline-none ml-3 w-full text-white placeholder:text-gray-500"
          />
        </div>

        {/* Notification */}
        <button className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700">
          <Bell size={20} />
        </button>

        {/* New Analysis */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold transition">
          <Plus size={18} />
          New Analysis
        </button>

      </div>

    </header>
  );
}

export default Topbar;