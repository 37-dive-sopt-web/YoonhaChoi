import { useState, useCallback } from "react";
import GameTabSection from "../components/tab-section/game-tab-section";
import RankingTabSection from "../components/tab-section/ranking-tab-section";

export const useTabControl = (initialTab = "게임") => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTab = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const renderContent = () => {
    if (activeTab === "게임") {
      return <GameTabSection />;
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
