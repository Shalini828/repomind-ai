import UploadCard from "../components/upload/UploadCard";
import GithubImport from "../components/upload/GithubImport";

function UploadRepository() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">

      <div className="max-w-5xl mx-auto px-8 py-16">

        <h1 className="text-5xl font-bold mb-4">
          Upload Repository
        </h1>

        <p className="text-gray-400 text-lg mb-12">
          Upload a ZIP file or connect a GitHub repository to begin AI analysis.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">

          <UploadCard />

          <GithubImport />

        </div>

      </div>

    </div>
  );
}

export default UploadRepository;