import { useState, useCallback, useMemo } from "react";
import { buildDeck } from "../utils/random-deck";
import GameTabSection from "../components/tab-section/game-tab-section";
import RankingTabSection from "../components/tab-section/ranking-tab-section";

export const useTabControl = (initialTab = "게임") => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [level, setLevel] = useState(1);

  const handleTab = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const deck = useMemo(() => buildDeck(level), [level]);

  const handleLevelChange = useCallback((newLevel) => {
    setLevel(newLevel);
  }, []);

  const renderContent = () => {
    if (activeTab === "게임") {
      return (
        <GameTabSection
          level={level}
          deck={deck}
          onLevelChange={handleLevelChange}
        />
      );
    }
    if (activeTab === "랭킹") {
      return <RankingTabSection />;
    }
  };

  return {
    activeTab,
    handleTab,
    renderContent,
  };
};
