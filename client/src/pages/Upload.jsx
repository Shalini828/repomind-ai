import UploadCard from "../components/upload/UploadCard";
import GithubImport from "../components/upload/GithubImport";

function Upload() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">

        <h1 className="text-5xl font-bold text-center mb-4">
          Upload Repository
        </h1>

        <p className="text-center text-gray-400 mb-12">
          Upload a ZIP file or connect a GitHub repository.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <UploadCard />
          <GithubImport />
        </div>

      </div>
    </div>
  );
}

export default Upload;