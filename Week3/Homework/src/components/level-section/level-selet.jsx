const LevelSelet = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-green-50 p-2">
      <select className="flex w-full cursor-pointer justify-between font-semibold">
        <option value="level-1">Level 1</option>
        <option value="level-2">Level 2</option>
        <option value="level-3">Level 3</option>
      </select>
    </div>
  );
};

export default LevelSelet;
