function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-28">
      <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-[#111827] to-cyan-600/10 p-12 text-center">

        <h2 className="text-5xl font-bold mb-6">
          Ready to Analyze Your Repository?
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Upload your repository or connect GitHub and let RepoMind AI review
          your code, generate documentation, and optimize LLM token usage.
        </p>

        <div className="flex flex-wrap justify-center gap-5">

          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition">
            Upload Repository
          </button>

          <button className="border border-gray-700 hover:border-blue-500 px-8 py-4 rounded-xl transition">
            Connect GitHub
          </button>

        </div>

      </div>
    </section>
  );
}

export default CTA;