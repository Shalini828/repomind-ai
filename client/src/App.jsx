import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    api.get("/")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch(() => {
        setMessage("Backend connection failed ❌");
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "28px",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  );
}

export default App;