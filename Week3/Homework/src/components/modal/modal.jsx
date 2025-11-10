import ModalPortal from "./modal-portal";
import { useEffect, useState } from "react";

const Modal = ({ isWin, timeTaken, onGameReset, currentLevel }) => {
  const [countdown, setCountdown] = useState(3);

  const title = isWin ? "축하해요!!!" : "제한 시간 만료!";
  const message = isWin
    ? `Level ${currentLevel}을 ${timeTaken}초 만에 클리어했어요.`
    : "아쉽게도 게임에 실패했어요.";

  const subtitle = `${countdown}초 후 자동으로 새 게임을 시작해요.`;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }

    if (countdown === 0) {
      onGameReset();
    }
  }, [countdown, onGameReset]);

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-100 rounded-2xl bg-white p-8 text-center">
          <h3 className="mb-4 text-xl font-extrabold">{title}</h3>
          <p className="mb-2 text-lg whitespace-nowrap">{message}</p>
          <p className="not-[]: mt-4 font-extrabold text-green-600">
            {subtitle}
          </p>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
