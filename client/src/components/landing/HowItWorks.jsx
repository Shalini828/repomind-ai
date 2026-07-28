import {
  FolderGit2,
  BrainCircuit,
  Sparkles,
  Bot,
  BarChart3,
} from "lucide-react";

import WorkflowStep from "./WorkflowStep";

const workflow = [
  {
    icon: <FolderGit2 size={32} />,
    title: "Upload Repository",
    description:
      "Connect GitHub or upload your repository to begin analysis.",
  },
  {
    icon: <BrainCircuit size={32} />,
    title: "Analyze Codebase",
    description:
      "Understand project structure, dependencies, and relationships.",
  },
  {
    icon: <Sparkles size={32} />,
    title: "Paritok Context Engine",
    description:
      "Select only the most relevant context before sending data to the LLM.",
  },
  {
    icon: <Bot size={32} />,
    title: "AI Processing",
    description:
      "Generate code reviews, documentation, bug reports, and suggestions.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Insights & Reports",
    description:
      "Receive actionable insights, token savings, and performance analytics.",
  },
];

function HowItWorks() {
  return (
    <section
      id="workflow"
      className="max-w-7xl mx-auto px-8 py-28"
    >
      <div className="text-center mb-16">

        <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm mb-6">
          ⚙️ HOW IT WORKS
        </div>

        <h2 className="text-5xl font-bold mb-6">
          How RepoMind AI Works
        </h2>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          From repository upload to AI insights — optimized with
          Paritok at every step.
        </p>

      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">

        {workflow.map((step) => (
          <WorkflowStep
            key={step.title}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}

      </div>
    </section>
  );
}

export default HowItWorks;