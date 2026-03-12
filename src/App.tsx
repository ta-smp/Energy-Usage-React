import React, { useState } from "react";
import "./App.css";
import "./power.css";
import PowerForm from "./PowerForm";
import PowerHistory from "./PowerHistory";
import { PowerEntry } from "./data";

function App() {
  const [lastAdded, setLastAdded] = useState<PowerEntry | null>(null);

  return (
    <div className="app-container">
      <div className="header">
        <h1>Power Usage Logger</h1>
      </div>

      <div className="card form-card">
        <PowerForm onAdded={setLastAdded} />
      </div>

      <div style={{height:16}} />

      <div className="card history">
        <PowerHistory />
      </div>
    </div>
  );
}

export default App;
