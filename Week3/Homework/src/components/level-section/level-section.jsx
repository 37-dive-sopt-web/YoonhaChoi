import GameItem from "./game-item";
import LevelSelet from "./level-selet";

const LevelSection = ({ level, onLevelChange }) => {
  return (
    <div className="flex min-w-100 flex-col gap-4 rounded-2xl bg-gray-200/50 p-4">
      <LevelSelet level={level} onLevelChange={onLevelChange} />
      <div className="flex gap-2">
        <GameItem title={"남은 시간"} value={"45.00"} />
        <GameItem title={"성공한 짝"} value={"45.00"} />
        <GameItem title={"남은 짝"} value={"45.00"} />
      </div>
      <span className="font-bold">안내 메시지</span>
      <div className="p flex w-full items-center justify-between rounded-2xl bg-green-50 px-3 py-6 font-bold">
        카드를 눌러 게임을 시작하세요.
      </div>
      <span className="font-bold">최근 히스토리</span>
    </div>
  );
};

export default LevelSection;
