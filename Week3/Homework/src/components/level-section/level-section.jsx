import GameItem from "./game-item";
import LevelSelet from "./level-selet";

const LevelSection = ({ level, onLevelChange, timer }) => {
  const { timeDisplay, isTimeOver, isRunning } = timer;

  let message = "카드를 눌러 게임을 시작";

  if (isRunning) {
    message = "잠시만 기다려 주세요";
  } else if (isTimeOver) {
    message = "시간 초과";
  } else if (!isRunning && timeDisplay !== "00.00") {
    message = "카드를 눌러 게임을 시작";
  }

  return (
    <div className="flex min-w-100 flex-col gap-4 rounded-2xl bg-gray-200/50 p-4">
      <LevelSelet level={level} onLevelChange={onLevelChange} />
      <div className="flex gap-2">
        <GameItem title={"남은 시간"} value={timeDisplay} />
        <GameItem title={"성공한 짝"} value={"45.00"} />
        <GameItem title={"남은 짝"} value={"45.00"} />
      </div>
      <span className="font-bold">안내 메시지</span>
      <div className="p flex w-full items-center justify-between rounded-2xl bg-green-50 px-3 py-6 font-bold">
        {message}
      </div>
      <span className="font-bold">최근 히스토리</span>
    </div>
  );
};

export default LevelSection;
