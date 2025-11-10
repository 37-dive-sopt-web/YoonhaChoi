import GameBoard from "../game-border-section/game-board";
import LevelSection from "../level-section/level-section";
import Modal from "../modal/modal";

const GameTabSection = ({
  level,
  deck,
  onLevelChange,
  timer,
  game,
  onGameReset,
}) => {
  const { isGameOver, isWin, finishTime } = game;

  return (
    <>
      <div className="flex justify-between overflow-x-auto rounded-2xl bg-green-100 p-6">
        <div className="mr-6 min-w-3xl flex-1">
          <GameBoard
            level={level}
            deck={deck}
            timer={timer}
            game={game}
            onGameReset={onGameReset}
          />
        </div>
        <LevelSection
          level={level}
          onLevelChange={onLevelChange}
          timer={timer}
          game={game}
        />
      </div>
      {isGameOver && (
        <Modal
          isWin={isWin}
          timeTaken={finishTime}
          onGameReset={onGameReset}
          currentLevel={level}
        />
      )}
    </>
  );
};

export default GameTabSection;
