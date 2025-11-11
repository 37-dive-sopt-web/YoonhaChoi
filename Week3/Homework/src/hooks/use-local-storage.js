import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "memoryGameRecords";

// 기록 정렬
const sortRecords = (records) => {
  if (!records || records.length === 0) {
    return [];
  }

  return [...records].sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level;
    }

    const timeA = parseFloat(a.clearTime);
    const timeB = parseFloat(b.clearTime);

    return timeA - timeB;
  });
};

// 클리어 기록 관리
export const useLocalStorage = () => {
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    const storedRecords = window.localStorage.getItem(STORAGE_KEY);

    if (storedRecords) {
      try {
        const records = JSON.parse(storedRecords);
        setStoredData(sortRecords(records));
      } catch (error) {
        setStoredData([]);
      }
    }
  }, []);

  //새로운 기록 저장
  const addData = useCallback((level, clearTime) => {
    const newRecord = {
      timestamp: new Date().toISOString(),
      level: level,
      clearTime: clearTime,
    };

    setStoredData((prevData) => {
      const updatedData = [...prevData, newRecord];

      const updatedRecords = sortRecords(updatedData);

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));

      return updatedRecords;
    });
  }, []);

  return { storedData, addData };
};
