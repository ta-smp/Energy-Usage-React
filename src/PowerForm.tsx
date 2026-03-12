import React, { useState } from "react";
import { addEntry, PowerEntry } from "./data";

type Props = { onAdded?: (e: PowerEntry) => void };

export default function PowerForm({ onAdded }: Props) {
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [consumption, setConsumption] = useState<number | "">("");
  const [weather, setWeather] = useState<string>("Sunny");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (consumption === "" || isNaN(Number(consumption))) return;
    const entry: PowerEntry = {
      id: Date.now().toString(),
      date,
      consumption: Number(consumption),
      weather,
    };
    addEntry(entry);
    setConsumption("");
    if (onAdded) onAdded(entry);
  }

  return (
    <form onSubmit={submit} className="power-form" aria-label="Power entry form">
      <label>
        Date
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} required />
      </label>

      <label>
        Consumption (kWh)
        <input
          type="number"
          value={consumption === "" ? "" : consumption}
          onChange={e => setConsumption(e.target.value === "" ? "" : Number(e.target.value))}
          step="0.01"
          min="0"
          required
        />
      </label>

      <label>
        Weather
        <select value={weather} onChange={e=>setWeather(e.target.value)}>
          <option>Sunny</option>
          <option>Cloudy</option>
          <option>Rainy</option>
          <option>Snow</option>
          <option>Windy</option>
          <option>Other</option>
        </select>
      </label>

      <button type="submit">Save</button>
    </form>
  );
}
