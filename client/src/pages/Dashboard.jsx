import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import QuickActions from "../components/dashboard/QuickActions";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <main className="p-8">

          <QuickActions />

        </main>

      </div>

    </div>
  );
}

export default Dashboard;