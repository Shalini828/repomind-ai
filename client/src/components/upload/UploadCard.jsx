import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function UploadCard() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Make sure it is a ZIP
    if (!file.name.toLowerCase().endsWith(".zip")) {
      alert("Please select a ZIP file.");
      return;
    }

    // 100 MB limit
    if (file.size > 100 * 1024 * 1024) {
      alert("ZIP file must be smaller than 100 MB.");
      return;
    }

    setSelectedFile(file);
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("repository", file);

      console.log("📦 Uploading:", file.name);

      const response = await api.post(
        "/upload/zip",
        formData
      );

      console.log(
        "ZIP upload response:",
        response.data
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message ||
            "Repository upload failed."
        );
      }
      navigate("/analysis");

    } catch (error) {
      console.error(
        "ZIP upload error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error.message ||
          "Failed to upload repository."
      );

      setSelectedFile(null);
    } finally {
      setLoading(false);

      // Allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div
      className="
        bg-[#111827]
        border-2
        border-dashed
        border-slate-700
        rounded-3xl
        p-10
        flex
        flex-col
        items-center
        justify-center
        text-center
        hover:border-blue-500
        transition-all
        duration-300
        min-h-[420px]
      "
    >

      <input
        ref={fileInputRef}
        type="file"
        accept=".zip"
        className="hidden"
        onChange={handleFileChange}
        disabled={loading}
      />

      <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">

        <UploadCloud
          size={42}
          className="text-blue-400"
        />

      </div>

      <h2 className="text-3xl font-bold mb-4">
        {loading
          ? "Uploading Repository..."
          : "Drag & Drop Repository"}
      </h2>

      <p className="text-gray-400 max-w-sm mb-8">

        {selectedFile
          ? `Selected: ${selectedFile.name}`
          : "Upload your repository as a ZIP file to start AI-powered analysis."}

      </p>

      <button
        type="button"
        onClick={handleBrowseClick}
        disabled={loading}
        className="
          bg-blue-600
          hover:bg-blue-700
          px-8
          py-4
          rounded-xl
          font-semibold
          transition-all
          duration-300
          hover:scale-105
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading
          ? "Uploading..."
          : "Browse Files"}
      </button>

      <p className="text-gray-500 text-sm mt-6">
        Supported: ZIP files up to 100 MB
      </p>

    </div>
  );
}

export default UploadCard;