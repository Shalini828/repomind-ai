import {
  FolderGit2,
  Bug,
  ShieldAlert,
  FileText,
  Coins,
} from "lucide-react";

function DashboardPreview() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-28">

      <div className="text-center mb-16">

        <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm mb-5">
          📊 DASHBOARD PREVIEW
        </div>

        <h2 className="text-5xl font-bold mb-5">
          See RepoMind AI in Action
        </h2>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          A quick look at the insights generated after analyzing a repository.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Left Card */}

        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

          <h3 className="text-2xl font-bold mb-8">
            AI Code Review Summary
          </h3>

          <div className="space-y-6">

            <div className="flex justify-between">
              <span className="flex gap-3">
                <FolderGit2 />
                Files Scanned
              </span>

              <strong>482</strong>
            </div>

            <div className="flex justify-between">
              <span className="flex gap-3">
                <Bug />
                Bugs Found
              </span>

              <strong>16</strong>
            </div>

            <div className="flex justify-between">
              <span className="flex gap-3">
                <ShieldAlert />
                Security Issues
              </span>

              <strong>4</strong>
            </div>

            <div className="flex justify-between">
              <span className="flex gap-3">
                <FileText />
                Docs Generated
              </span>

              <strong>✓</strong>
            </div>

            <div className="flex justify-between">
              <span className="flex gap-3">
                <Coins />
                Tokens Saved
              </span>

              <strong className="text-green-400">
                94%
              </strong>
            </div>

          </div>

        </div>

        {/* Right Card */}

        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

          <h3 className="text-2xl font-bold mb-8">
            Analysis Progress
          </h3>

          <div className="space-y-8">

            <div>
              <p className="mb-2">Repository Upload</p>

              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-full"></div>
              </div>
            </div>

            <div>
              <p className="mb-2">AI Code Review</p>

              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[90%]"></div>
              </div>
            </div>

            <div>
              <p className="mb-2">Documentation</p>

              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[75%]"></div>
              </div>
            </div>

            <div>
              <p className="mb-2">Token Optimization</p>

              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[94%]"></div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardPreview;