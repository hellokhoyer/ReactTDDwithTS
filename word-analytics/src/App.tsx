import { useEffect, useState } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Stats from "./components/Stats";
import Textarea from "./components/Textarea";
import type { Stats as StatsType } from "./lib/types";

const LAST_CHECKED_STORAGE_KEY = "word-analytics:last-checked-at";

const initialStats: StatsType = {
  numberOfWords: 0,
  numberOfCharacters: 0,
  instagramCharactersLeft: 280,
  facebookCharactersLeft: 2200,
};

function App() {
  const [stats, setStats] = useState<StatsType>(initialStats);
  const [lastCheckedAt, setLastCheckedAt] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedTimestamp = window.localStorage.getItem(
      LAST_CHECKED_STORAGE_KEY,
    );

    if (storedTimestamp) {
      setLastCheckedAt(storedTimestamp);
    }
  }, []);

  const handleStatsChange = (updatedStats: StatsType) => {
    setStats(updatedStats);

    const timestamp = new Date().toISOString();
    setLastCheckedAt(timestamp);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(LAST_CHECKED_STORAGE_KEY, timestamp);
    }
  };

  return (
    <>
      <Header />

      <Main>
        <Textarea onStatsChange={handleStatsChange} />
        <Stats stats={stats} />
      </Main>

      <Footer lastCheckedAt={lastCheckedAt} />
    </>
  );
}

export default App;
