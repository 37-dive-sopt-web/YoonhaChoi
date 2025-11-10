import { useState, useCallback, useMemo } from "react";
import { buildDeck } from "../utils/random-deck";
import { useTimer } from "./use-timer";
import { useGame } from "./use-game";
import GameTabSection from "../components/tab-section/game-tab-section";
import RankingTabSection from "../components/tab-section/ranking-tab-section";

export const useTabControl = (initialTab = "게임") => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [level, setLevel] = useState(1);

  const timer = useTimer(level);
  const deck = useMemo(() => buildDeck(level), [level]);
  const game = useGame(deck, timer);

  const handleTab = useCallback(
    (tabName) => {
      setActiveTab(tabName);
      timer.stopTimer();
    },
    [timer],
  );

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
          timer={timer}
          game={game}
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
