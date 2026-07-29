import { FolderGit2, ChevronRight } from "lucide-react";

const repositories = [
  {
    name: "Expense Tracker",
    language: "React + Node.js",
    status: "Analyzed",
  },
  {
    name: "RepoMind AI",
    language: "React + Express",
    status: "In Progress",
  },
  {
    name: "Portfolio Website",
    language: "Next.js",
    status: "Completed",
  },
];

function RecentRepositories() {
  return (
    <section className="mt-12">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Recent Repositories
        </h2>

        <button className="text-blue-400 hover:text-blue-300">
          View All
        </button>

      </div>

      <div className="space-y-5">

        {repositories.map((repo) => (

          <div
            key={repo.name}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex items-center justify-between hover:border-blue-500 transition"
          >

            <div className="flex items-center gap-5">

              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">

                <FolderGit2 size={22} />

              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  {repo.name}
                </h3>

                <p className="text-gray-400">
                  {repo.language}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-5">

              <span
                className={`px-4 py-2 rounded-full text-sm
                ${
                  repo.status === "Completed"
                    ? "bg-green-500/20 text-green-400"
                    : repo.status === "In Progress"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {repo.status}
              </span>

              <ChevronRight />

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default RecentRepositories;