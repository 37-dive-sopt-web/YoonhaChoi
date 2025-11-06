import GameItem from "./game-item";
import LevelSelet from "./level-selet";

const LevelSection = () => {
  return (
    <div className="flex w-100 flex-col gap-4 rounded-2xl bg-gray-200/50 p-4">
      <LevelSelet />
      <div className="flex gap-2">
        <GameItem title={"남은 시간"} value={"45.00"} />
        <GameItem title={"남은 시간"} value={"45.00"} />
        <GameItem title={"남은 시간"} value={"45.00"} />
      </div>
    </div>
  );
};

export default LevelSection;
