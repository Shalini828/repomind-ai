import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRepositoryAnalysis } from "../services/uploadService";

const steps = [
  "Reading repository...",
  "Detecting framework...",
  "Building dependency graph...",
  "Optimizing context with Paritok...",
  "Running AI code review...",
  "Generating documentation...",
  "Finalizing analysis...",
];

function AnalysisProgress() {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(5);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const runAnalysis = async () => {
      try {
        // Start real backend analysis
        const analysis = await getRepositoryAnalysis();

        if (cancelled) return;

        console.log("Repository Analysis:", analysis);

        // Analysis completed successfully
        setProgress(100);
        setCurrentStep(steps.length - 1);

        // Give the user a moment to see 100%
        setTimeout(() => {
          if (!cancelled) {
            navigate("/dashboard");
          }
        }, 800);
      } catch (error) {
        console.error("Repository analysis failed:", error);

        if (!cancelled) {
          setError(
            error?.response?.data?.message ||
              "Repository analysis failed. Please try again."
          );
        }
      }
    };

    runAnalysis();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // Visual progress while backend is analyzing
  useEffect(() => {
    if (error || progress >= 95) return;

    const interval = setInterval(() => {
      setProgress((previous) => {
        const next = previous + 2;

        setCurrentStep(
          Math.min(
            Math.floor((next / 100) * steps.length),
            steps.length - 1
          )
        );

        return next;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [error, progress]);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-[#111827] rounded-3xl border border-slate-800 p-10">

        <h1 className="text-4xl font-bold mb-3">
          Analyzing Repository
        </h1>

        <p className="text-gray-400 mb-10">
          Please wait while RepoMind AI scans and understands your project.
        </p>

        {error ? (
          <div className="space-y-6">
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4">
              {error}
            </div>

            <button
              onClick={() => navigate("/upload")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              Back to Upload
            </button>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Progress information */}
            <div className="flex justify-between mt-3 text-sm text-gray-400">
              <span>{progress}%</span>
              <span>{steps[currentStep]}</span>
            </div>

            {/* Analysis steps */}
            <div className="mt-10 space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center gap-3 ${
                    index <= currentStep
                      ? "text-green-400"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      index <= currentStep
                        ? "bg-green-400"
                        : "bg-gray-600"
                    }`}
                  />

                  <span>{step}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AnalysisProgress;