import { useState, useCallback, useEffect, useMemo } from "react";

const CARD_STATUS = {
  CLOSED: "closed",
  OPEN: "open",
  MATCHED: "matched",
};

export const useGame = (deck, timer) => {
  const [cardStates, setCardStates] = useState({}); // { [cardId]: "closed" | "open" | "matched" }
  const [openCardIds, setOpenCardIds] = useState([]); //현재 앞면이 보이는 카드 ID (최대 2개)
  const [matchedPairs, setMatchedPairs] = useState(0); // 성공한 짝의 쌍(Pair) 개수
  const [isProcessing, setIsProcessing] = useState(false); // 짝 검사 중 클릭을 막는 잠금 플래그
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [finishTime, setFinishTime] = useState(null);

  // 덱이 변경될 때마다 게임 상태 초기화
  useEffect(() => {
    const initialStates = deck.reduce((acc, card) => {
      acc[card.id] = CARD_STATUS.CLOSED;
      return acc;
    }, {});
    setCardStates(initialStates);
    setOpenCardIds([]);
    setMatchedPairs(0);
    setIsProcessing(false);

    setIsGameOver(false);
    setIsWin(false);
    setFinishTime(null);
  }, [deck]);

  // 짝 검사 로직
  useEffect(() => {
    if (openCardIds.length === 2) {
      setIsProcessing(true);
      const [id1, id2] = openCardIds;

      const card1 = deck.find((c) => c.id === id1);
      const card2 = deck.find((c) => c.id === id2);

      const delayTime = 500;

      if (card1.value === card2.value) {
        // 짝이 맞는 경우
        const timeoutId = setTimeout(() => {
          setCardStates((prev) => ({
            ...prev,
            [id1]: CARD_STATUS.MATCHED,
            [id2]: CARD_STATUS.MATCHED,
          }));
          setMatchedPairs((prev) => prev + 1);
          setOpenCardIds([]);
          setIsProcessing(false);
        }, delayTime);
        return () => clearTimeout(timeoutId);
      } else {
        // 짝이 맞지 않는 경우
        const timeoutId = setTimeout(() => {
          setCardStates((prev) => ({
            ...prev,
            [id1]: CARD_STATUS.CLOSED,
            [id2]: CARD_STATUS.CLOSED,
          }));
          setOpenCardIds([]);
          setIsProcessing(false);
        }, delayTime);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [openCardIds, deck]);

  useEffect(() => {
    const totalPairs = deck.length / 2;
    const isRunning = timer.isRunning;
    const isTimeOver = timer.isTimeOver;

    if (matchedPairs > 0 && matchedPairs === totalPairs && isRunning) {
      timer.stopTimer();
      setIsGameOver(true);
      setIsWin(true);

      const timeTaken = (timer.limitTime - timer.timeLeft) / 1000;
      setFinishTime(timeTaken.toFixed(2));
    } else if (isTimeOver && !isGameOver) {
      setIsGameOver(true);
      setIsWin(false);
    }
  }, [matchedPairs, deck.length, timer]);

  const handleCardClick = useCallback(
    (clickedCardId) => {
      if (isProcessing || cardStates[clickedCardId] !== CARD_STATUS.CLOSED) {
        return;
      }

      if (timer && !timer.isRunning && !timer.isTimeOver) {
        timer.startTimer();
      }

      if (openCardIds.length < 2) {
        setCardStates((prev) => ({
          ...prev,
          [clickedCardId]: CARD_STATUS.OPEN,
        }));

        setOpenCardIds((prevIds) => [...prevIds, clickedCardId]);
      }
    },
    [cardStates, timer, isProcessing, openCardIds],
  );

  return {
    cardStates,
    matchedPairs,
    handleCardClick,
    totalPairs: deck.length / 2,
    isProcessing,
    isGameOver,
    isWin,
    finishTime,
  };
};
