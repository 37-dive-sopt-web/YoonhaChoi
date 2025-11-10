import { useState, useCallback, useMemo } from "react";
import { buildDeck } from "../utils/random-deck";
import { useTimer } from "./use-timer";
import { useGame } from "./use-game";
import GameTabSection from "../components/tab-section/game-tab-section";
import RankingTabSection from "../components/tab-section/ranking-tab-section";

export const useTabControl = (initialTab = "게임") => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [level, setLevel] = useState(1);

  const [deckKey, setDeckKey] = useState(0);

  const timer = useTimer(level);
  const deck = useMemo(() => buildDeck(level), [level, deckKey]);
  const game = useGame(deck, timer);

  const handleGameReset = useCallback(() => {
    timer.resetTimer();
    setDeckKey((prev) => prev + 1);
  }, [timer]);

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
          onGameReset={handleGameReset}
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
