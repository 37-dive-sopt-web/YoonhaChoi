import GameItem from "./game-item";
import LevelSelet from "./level-selet";

const LevelSection = ({ level, onLevelChange, timer, game }) => {
  const { timeDisplay, isRunning, isTimeOver } = timer;
  const { matchedPairs, totalPairs, pairHistory } = game;

  const remainingPairs = totalPairs - matchedPairs;
  const successDisplay = `${matchedPairs}/${totalPairs}`;

  let message = "카드를 눌러 게임을 시작";

  if (isRunning) {
    message = "게임을 진행 중입니다.";
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
        <GameItem title={"성공한 짝"} value={successDisplay} />
        <GameItem title={"남은 짝"} value={remainingPairs} />
      </div>

      <span className="font-bold">안내 메시지</span>
      <div className="p flex w-full items-center justify-between rounded-2xl bg-green-50 px-3 py-6 font-bold">
        {message}
      </div>

      <span className="font-bold">최근 히스토리</span>
      <div className="h-full overflow-y-auto rounded-2xl bg-green-50 p-3">
        {pairHistory && pairHistory.length > 0 ? (
          pairHistory.map((history, index) => (
            <p
              key={index}
              className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                history.result === "성공" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>{`${history.card1Value},${history.card2Value}`}</span>
              <span>{history.result}</span>
            </p>
          ))
        ) : (
          <p className="text-center text-gray-500">
            아직 뒤집은 카드가 없어요.
          </p>
        )}
      </div>
    </div>
  );
};

export default LevelSection;
