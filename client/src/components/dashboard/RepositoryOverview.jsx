import { useEffect, useState } from "react";
import { getRepository } from "../../services/repositoryService";

function RepositoryOverview() {
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    async function loadRepository() {
      try {
        const data = await getRepository();
        setRepository(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadRepository();
  }, []);

  if (!repository) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading repository...
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold">
              {repository.name}
            </h2>

            <p className="text-gray-400 mt-2">
              {repository.description}
            </p>

            <div className="flex gap-6 mt-6 text-gray-400">
              <span>{repository.language}</span>

              <span>{repository.files} Files</span>

              <span>{repository.folders} Folders</span>

              <span>{repository.size}</span>
            </div>
          </div>

          <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
            {repository.status}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {repository.stats.map((item) => (
          <div
            key={item.title}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6"
          >
            <p className="text-gray-400">{item.title}</p>

            <h3 className="text-3xl font-bold mt-3">
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">
        <h3 className="text-2xl font-bold mb-5">
          AI Repository Summary
        </h3>

        <p className="text-gray-400 leading-8">
          {repository.summary}
        </p>
      </div>
    </section>
  );
}

export default RepositoryOverview;