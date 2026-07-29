import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#0B1220]/80 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">
            R
          </div>

          <h1 className="text-2xl font-bold tracking-wide">RepoMind AI</h1>
        </div>

        {/* Navigation */}

        <div className="hidden md:flex gap-10 text-gray-300">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#how-it-works" className="hover:text-white transition">
            How It Works
          </a>

          <a href="#dashboard-preview" className="hover:text-white transition">
            Dashboard
          </a>

          <a href="#cta" className="hover:text-white transition">
            Launch App
          </a>
        </div>

        {/* Button */}

        <Link
          to="/upload"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl font-semibold transition"
        >
          Launch App
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
