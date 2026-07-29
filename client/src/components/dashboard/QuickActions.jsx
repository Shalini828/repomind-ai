import {
  Upload,
  GitBranch,
  MessageSquare,
  FileText,
} from "lucide-react";

function QuickActions() {
  const actions = [
    {
      title: "Upload Repository",
      desc: "Analyze local Git repository",
      icon: Upload,
      color: "bg-blue-600",
    },
    {
      title: "Connect GitHub",
      desc: "Import from GitHub account",
      icon: GitBranch,
      color: "bg-gray-700",
    },
    {
      title: "AI Chat",
      desc: "Ask questions about your code",
      icon: MessageSquare,
      color: "bg-purple-600",
    },
    {
      title: "Generate Docs",
      desc: "Create README & documentation",
      icon: FileText,
      color: "bg-green-600",
    },
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition cursor-pointer"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${action.color}`}
            >
              <action.icon size={24} />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              {action.title}
            </h3>

            <p className="text-gray-400 mt-2">
              {action.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;