import Tab from "../tab";
import Card from "./card";
const GameBoard = () => {
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
      <div className="mx-45">
        <Card />
      </div>
    </div>
  );
};

export default GameBoard;
