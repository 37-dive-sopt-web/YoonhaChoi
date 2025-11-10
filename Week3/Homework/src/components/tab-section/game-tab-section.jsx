import GameBoard from "../game-border-section/game-board";
import LevelSection from "../level-section/level-section";

const GameTabSection = () => {
  return (
    <div className="flex justify-between overflow-x-auto rounded-2xl bg-green-100 p-6">
      <div className="mr-6 min-w-3xl flex-1">
        <GameBoard />
      </div>
      <LevelSection />
    </div>
  );
};

export default GameTabSection;
