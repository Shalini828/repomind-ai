import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import AnalysisProgress from "./pages/AnalysisProgress";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analysis" element={<AnalysisProgress />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;