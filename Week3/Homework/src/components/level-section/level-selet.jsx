const LevelSelet = ({ level, onLevelChange }) => {
  const handleChange = (e) => {
    onLevelChange(Number(e.target.value));
  };

  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-green-50 px-3 py-2">
      <select
        className="flex w-full cursor-pointer justify-between bg-transparent font-semibold"
        value={level}
        onChange={handleChange}
      >
        <option value={1}>Level 1</option>
        <option value={2}>Level 2</option>
        <option value={3}>Level 3</option>
      </select>
    </div>
  );
};

export default LevelSelet;
