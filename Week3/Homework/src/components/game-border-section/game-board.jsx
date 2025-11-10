import Tab from "../tab";
import Card from "./card";
import { LEVEL_TO_GRID } from "../../utils/random-deck";

const GameBoard = ({ deck, level, timer, game }) => {
  const [, cols] = LEVEL_TO_GRID[level] || [4, 4];

  const { startTimer, resetTimer, isRunning, isTimeOver } = timer;
  const {
    handleCardClick: gameCardClickHandler,
    cardStates,
    isProcessing,
  } = game;

  const handleCardClick = (cardId) => {
    if (!isRunning && !isTimeOver) {
      startTimer();
    }

    gameCardClickHandler(cardId);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="nowrap mb-4 text-2xl font-bold whitespace-nowrap">
          게임 보드
        </h2>
        <Tab variant="reset" onClick={resetTimer}>
          게임 리셋
        </Tab>
      </div>
      <div
        className="grid gap-2 px-40"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {deck.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            onClick={() => handleCardClick(card.id)}
            isCardOpen={cardStates[card.id] !== "closed"}
            isDisabled={isProcessing || cardStates[card.id] === "matched"}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
