import { useState, useEffect, useCallback, useMemo } from "react";

const LEVEL_TO_TIME = {
  1: 45 * 1000,
  2: 60 * 1000,
  3: 100 * 1000,
};

export const useTimer = (level) => {
  const limitTime = useMemo(
    () => LEVEL_TO_TIME[level] || LEVEL_TO_TIME[1],
    [level],
  );

  const [timeLeft, setTimeLeft] = useState(limitTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);

  // 레벨이 변경될 때마다 타이머 초기화
  useEffect(() => {
    setTimeLeft(limitTime);
    setIsRunning(false);
    setIsTimeOver(false);
  }, [limitTime]);

  const startTimer = useCallback(() => {
    if (!isTimeOver) {
      setIsRunning(true);
    }
  }, [isTimeOver]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(limitTime);
    setIsRunning(false);
    setIsTimeOver(false);
  }, [limitTime]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft <= 0 && !isTimeOver) {
        setIsRunning(false);
        setIsTimeOver(true);
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 10);
    }, 10);

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, isTimeOver]);

  // 시간 형식 변환 함수
  const formatTime = useCallback((time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    const pad = (num) => (num < 10 ? `0${num}` : num);

    return `${pad(seconds)}.${pad(milliseconds)}`;
  }, []);

  return {
    timeLeft,
    timeDisplay: formatTime(Math.max(0, timeLeft)),
    isRunning,
    isTimeOver,
    startTimer,
    stopTimer,
    resetTimer,
    limitTime,
  };
};
