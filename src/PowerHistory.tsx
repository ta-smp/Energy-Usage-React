import React, { useMemo } from "react";
import { loadEntries } from "./data";

function simpleBarWidth(value: number, max: number) {
  if (max === 0) return "0%";
  return `${Math.round((value / max) * 100)}%`;
}

export default function PowerHistory() {
  const entries = useMemo(() => {
    const loaded = loadEntries();
    return loaded.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  }, []);

  const max = entries.reduce((m, e) => Math.max(m, e.consumption), 0);

  if (entries.length === 0) return <div className="muted">No entries yet.</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th style={{textAlign:"right"}}>kWh</th>
            <th>Weather</th>
            <th>Visual</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td style={{textAlign:"right"}}>{e.consumption.toFixed(2)}</td>
              <td>{e.weather}</td>
              <td style={{width:200}}>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: simpleBarWidth(e.consumption, max) }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="muted">Showing {entries.length} records (latest first).</div>
    </div>
  );
}
