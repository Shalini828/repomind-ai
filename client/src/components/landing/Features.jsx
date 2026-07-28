import {
  FolderGit2,
  Bot,
  ShieldCheck,
  Zap,
  FileText,
  Coins,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <FolderGit2 size={28} />,
    title: "Repository Analysis",
    description:
      "Understand the complete repository structure, dependencies, and architecture.",
  },
  {
    icon: <Bot size={28} />,
    title: "AI Code Review",
    description:
      "Detect bugs, code smells, and suggest intelligent improvements.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Security Scanner",
    description:
      "Find vulnerabilities, exposed secrets, and insecure coding practices.",
  },
  {
    icon: <Zap size={28} />,
    title: "Performance Insights",
    description:
      "Identify bottlenecks, expensive operations, and optimization opportunities.",
  },
  {
    icon: <FileText size={28} />,
    title: "Documentation Generator",
    description:
      "Generate README files, API docs, and architecture summaries automatically.",
  },
  {
    icon: <Coins size={28} />,
    title: "Token Optimization",
    description:
      "Reduce LLM token usage with Paritok-powered intelligent context selection.",
  },
];

function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-8 py-28">

      <div className="text-center mb-16">

        <h2 className="text-5xl font-bold mb-6">
          Powerful Features
        </h2>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Everything you need to understand, review, optimize, and chat with
          your repositories using AI.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}

      </div>

    </section>
  );
}

export default Features;