import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GitBranch, Search } from "lucide-react";
import { analyzeGithubRepo } from "../../services/uploadService";

function GithubImport() {
  const navigate = useNavigate();

  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    const trimmedUrl = repoUrl.trim();

    if (!trimmedUrl) {
      alert("Please enter a GitHub repository URL.");
      return;
    }

    if (!trimmedUrl.startsWith("https://github.com/")) {
      alert("Please enter a valid GitHub repository URL.");
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeGithubRepo(trimmedUrl);

      console.log("Backend Response:", response);

      // Optional: Clear the input
      setRepoUrl("");

      // Go to analysis progress page
      navigate("/analysis");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to analyze repository."
      );
    } finally {
      setLoading(false);
    }
  };

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
        type="url"
        value={repoUrl}
        disabled={loading}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="https://github.com/username/repository"
        className="w-full mt-3 bg-[#0B1220] border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:opacity-60"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 rounded-xl py-4 font-semibold flex justify-center items-center gap-3 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Search size={20} />

        {loading ? "Analyzing..." : "Analyze Repository"}
      </button>

      <div className="mt-10">
        <p className="text-gray-400 text-sm mb-4">
          Supported Technologies
        </p>

        <div className="flex flex-wrap gap-3">

          {[
            "React",
            "Node.js",
            "Next.js",
            "Spring Boot",
            "Python",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-2 rounded-lg bg-slate-800 text-sm"
            >
              {tech}
            </span>
          ))}

        </div>
      </div>

    </div>
  );
}

export default GithubImport;