function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 min-h-[85vh] flex items-center">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Section */}
        <div className="space-y-8">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm">
            ✨ Intelligent Context Optimization
          </span>

          <h1 className="text-6xl font-extrabold leading-tight">
            <br />
            Your AI Copilot
            <br />
            for Every Repository
          </h1>

          <p className="text-xl text-gray-400 leading-8 max-w-xl">
            Analyze entire repositories intelligently, reduce LLM token usage,
            review code, detect bugs, and generate documentation — all powered
            by smart context optimization.
          </p>

          <div className="flex gap-5">
            <button className="bg-blue-600 hover:bg-blue-700 transition px-7 py-4 rounded-xl font-semibold">
              Upload Repository
            </button>

            <button className="border border-gray-700 hover:border-blue-500 transition px-7 py-4 rounded-xl">
              Connect GitHub
            </button>
          </div>
        </div>

        {/* Right Section */}

        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-3xl bg-[#111827] border border-gray-800 p-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-6">Token Savings</h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Original</span>

                <span>210k Tokens</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Optimized</span>

                <span className="text-green-400">12k Tokens</span>
              </div>

              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[94%] rounded-full"></div>
              </div>

              <h1 className="text-5xl font-bold text-green-400 text-center mt-8">
                94%
              </h1>

              <p className="text-center text-gray-400">Token Reduction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
