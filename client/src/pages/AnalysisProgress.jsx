import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            navigate("/dashboard");
          }, 800);

          return 100;
        }

        setCurrentStep(
          Math.min(
            Math.floor((next / 100) * steps.length),
            steps.length - 1
          )
        );

        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-2xl bg-[#111827] rounded-3xl border border-slate-800 p-10">

        <h1 className="text-4xl font-bold mb-3">
          Analyzing Repository
        </h1>

        <p className="text-gray-400 mb-10">
          Please wait while RepoMind AI scans and understands your project.
        </p>

        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />

        </div>

        <div className="flex justify-between mt-3 text-sm text-gray-400">
          <span>{progress}%</span>
          <span>{steps[currentStep]}</span>
        </div>

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

      </div>

    </div>
  );
}

export default AnalysisProgress;