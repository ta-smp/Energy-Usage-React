export type PowerEntry = {
  id: string;
  date: string; // ISO yyyy-mm-dd
  consumption: number; // kWh
  weather: string;
};

const STORAGE_KEY = "power_entries_v1";

export function loadEntries(): PowerEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PowerEntry[];
  } catch {
    return [];
  }
}

export function saveEntries(entries: PowerEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore
  }
}

export function addEntry(entry: PowerEntry) {
  const entries = loadEntries();
  entries.push(entry);
  saveEntries(entries);
}

export function clearEntries() {
  localStorage.removeItem(STORAGE_KEY);
}