import { useState } from "react";

const Card = ({ value, onClick }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleClick = () => {
    onClick();
    setIsCardOpen((prev) => !prev);
  };

  const rotation = isCardOpen ? "rotate-y-180" : "";

  return (
    <div
      onClick={handleClick}
      className={`card_inner max-auto flex aspect-square cursor-pointer items-center justify-center rounded-2xl bg-green-200 transition-transform duration-500 [transform-style:preserve-3d] ${rotation}`}
    >
      <div className="text-6xl font-bold text-white">?</div>

      <div className="absolute inset-0 flex [transform:rotateY(180deg)] items-center justify-center rounded-xl bg-green-300 text-center text-6xl font-bold text-white backface-hidden">
        {value}
      </div>
    </div>
  );
};

export default Card;
