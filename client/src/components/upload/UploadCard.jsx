import { UploadCloud } from "lucide-react";

function UploadCard() {
  return (
    <div className="bg-[#111827] border-2 border-dashed border-slate-700 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-all duration-300 min-h-[420px]">

      <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">
        <UploadCloud size={42} className="text-blue-400" />
      </div>

      <h2 className="text-3xl font-bold mb-4">
        Drag & Drop Repository
      </h2>

      <p className="text-gray-400 max-w-sm mb-8">
        Upload your repository as a ZIP file to start AI-powered analysis.
      </p>

      <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
        Browse Files
      </button>

      <p className="text-gray-500 text-sm mt-6">
        Supported: ZIP files up to 100 MB
      </p>

    </div>
  );
}

export default UploadCard;