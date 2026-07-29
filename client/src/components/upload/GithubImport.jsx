import { GitBranch, Search } from "lucide-react";

function GithubImport() {
  return (
    <div className="bg-[#111827] rounded-3xl border border-slate-800 p-10 min-h-[420px]">

      <div className="flex items-center gap-3 mb-8">

        <GitBranch size={32} />

        <h2 className="text-3xl font-bold">
          Import from GitHub
        </h2>

      </div>

      <label className="text-gray-400">
        Repository URL
      </label>

      <input
        type="text"
        placeholder="https://github.com/username/repository"
        className="w-full mt-3 bg-[#0B1220] border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
      />

      <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 rounded-xl py-4 font-semibold flex justify-center items-center gap-3 transition">

        <Search size={20} />

        Analyze Repository

      </button>

      <div className="mt-10 text-gray-400 text-sm">

        Supported

        <div className="flex flex-wrap gap-3 mt-4">

          <span className="px-3 py-2 rounded-lg bg-slate-800">
            React
          </span>

          <span className="px-3 py-2 rounded-lg bg-slate-800">
            Node
          </span>

          <span className="px-3 py-2 rounded-lg bg-slate-800">
            Next.js
          </span>

          <span className="px-3 py-2 rounded-lg bg-slate-800">
            Spring Boot
          </span>

          <span className="px-3 py-2 rounded-lg bg-slate-800">
            Python
          </span>

        </div>

      </div>

    </div>
  );
}

export default GithubImport;