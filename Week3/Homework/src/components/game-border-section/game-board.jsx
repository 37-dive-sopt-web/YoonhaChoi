import Tab from "../tab";
import Card from "./card";
import { LEVEL_TO_GRID } from "../../utils/random-deck";

const GameBoard = ({ deck, level, timer }) => {
  const [, cols] = LEVEL_TO_GRID[level] || [4, 4];

  const { startTimer } = timer;

  const handleCardClick = () => {
    if (!timer.isRunning && !timer.isTimeOver) {
      startTimer();
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="nowrap mb-4 text-2xl font-bold whitespace-nowrap">
          게임 보드
        </h2>
        <Tab variant="reset" onClick={() => handleTab("랭킹")}>
          게임 리셋
        </Tab>
      </div>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {deck.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
