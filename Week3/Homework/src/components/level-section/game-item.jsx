const GameItem = ({ title, value }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-green-50 py-4">
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default GameItem;
