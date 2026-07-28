import {
  LayoutDashboard,
  FolderGit2,
  MessageSquare,
  FileText,
  ShieldCheck,
  Settings,
} from "lucide-react";

function Sidebar() {
  const menu = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: FolderGit2, label: "Repositories" },
    { icon: MessageSquare, label: "AI Chat" },
    { icon: FileText, label: "Documentation" },
    { icon: ShieldCheck, label: "Security" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-72 min-h-screen border-r border-slate-800 bg-[#0F172A] flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-blue-500">
          RepoMind AI
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          AI Repository Assistant
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-5 space-y-2">

        {menu.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition

            ${
              index === 0
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-slate-800 hover:text-white"
            }
            `}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}

      </nav>

      {/* Bottom */}

      <div className="p-6 border-t border-slate-800">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="text-sm text-gray-400">
            Token Saved
          </p>

          <h2 className="text-3xl font-bold text-green-400">
            94%
          </h2>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;