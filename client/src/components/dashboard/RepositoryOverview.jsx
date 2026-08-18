import { useEffect, useState } from "react";
import { getRepository } from "../../services/repositoryService";

function RepositoryOverview() {
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    async function loadRepository() {
      try {
        const data = await getRepository();

        console.log("Dashboard Repository Data:", data);

        setRepository(data);
      } catch (err) {
        console.error("Failed to load repository:", err);
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

  const fileCount = Array.isArray(repository.files)
    ? repository.files.length
    : repository.files ?? 0;

  const folderCount = Array.isArray(repository.folders)
    ? repository.folders.length
    : repository.folders ?? 0;

  let languageDisplay = "Unknown";

  if (typeof repository.language === "string") {
    languageDisplay = repository.language;
  } else if (
    repository.language &&
    typeof repository.language === "object"
  ) {
    const languages = Object.keys(repository.language);

    if (languages.length > 0) {
      languageDisplay = languages
        .map((language) =>
          language.startsWith(".")
            ? language.substring(1).toUpperCase()
            : language
        )
        .join(", ");
    }
  }

  const status = repository.status || "Completed";

  return (
    <section className="space-y-8">


      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">

        <div className="flex justify-between items-start gap-8">

          <div className="min-w-0">

            <h2 className="text-4xl font-bold">
              {repository.name || "Repository"}
            </h2>

            <p className="text-gray-400 mt-2">
              {repository.description ||
                "No description available."}
            </p>

            {/* Repository basic information */}

            <div className="flex flex-wrap gap-6 mt-6 text-gray-400">

              <span>
                <strong className="text-white">
                  Languages:
                </strong>{" "}
                {languageDisplay}
              </span>

              <span>
                <strong className="text-white">
                  Files:
                </strong>{" "}
                {fileCount}
              </span>

              <span>
                <strong className="text-white">
                  Folders:
                </strong>{" "}
                {folderCount}
              </span>

              <span>
                <strong className="text-white">
                  Size:
                </strong>{" "}
                {repository.size || "Unknown"}
              </span>

            </div>

          </div>

          {/* Status */}

          <span className="shrink-0 bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
            {status}
          </span>

        </div>
      </div>

      {Array.isArray(repository.stats) &&
        repository.stats.length > 0 && (

          <div className="grid md:grid-cols-4 gap-6">

            {repository.stats.map((item, index) => (

              <div
                key={item.title || index}
                className="bg-[#111827] border border-slate-800 rounded-2xl p-6"
              >

                <p className="text-gray-400">
                  {item.title}
                </p>

                <h3 className="text-3xl font-bold mt-3 break-words">
                  {String(item.value ?? "-")}
                </h3>

              </div>

            ))}

          </div>
        )}

      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">

        <h3 className="text-2xl font-bold mb-5">
          AI Repository Summary
        </h3>

        <p className="text-gray-400 leading-8">
          {typeof repository.summary === "string"
            ? repository.summary
            : "Repository analysis completed successfully."}
        </p>

      </div>

    </section>
  );
}

export default RepositoryOverview;