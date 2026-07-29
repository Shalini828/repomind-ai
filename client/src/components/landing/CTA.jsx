import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  return (
    <section
      id="cta"
      className="max-w-7xl mx-auto px-8 py-28"
    >
      <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-[#111827] to-cyan-600/10 p-12 text-center">

        <h2 className="text-5xl font-bold mb-6">
          Launch RepoMind AI
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Start your first AI-powered repository analysis. Upload your
          project, review code, detect bugs, generate documentation, and
          optimize LLM token usage in seconds.
        </p>

        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 px-10 py-4 rounded-xl font-semibold shadow-lg shadow-blue-600/20"
        >
          Launch App
        </button>

      </div>
    </section>
  );
}

export default CTA;