const Card = ({ onClick }) => {
  const handleCardClick = () => {
    onClick();
  };

  return (
    <div
      onClick={handleCardClick}
      className="max-auto flex aspect-square items-center justify-center rounded-2xl bg-green-200"
    >
      <span className="text-6xl font-bold text-white">?</span>
    </div>
  );
};

export default Card;
