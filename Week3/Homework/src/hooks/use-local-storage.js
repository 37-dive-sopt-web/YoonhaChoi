import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "memoryGameRecords";

export const useLocalStorage = () => {
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    try {
      const storedRecords = window.localStorage.getItem(STORAGE_KEY);
      if (storedRecords) {
        setStoredData(JSON.parse(storedRecords));
      }
    } catch (error) {
      console.error("Failed to load records from localStorage:", error);
    }
  }, []);

  const addData = useCallback((level, clearTime) => {
    const newRecord = {
      timestamp: new Date().toISOString(),
      level: level,
      clearTime: clearTime,
    };

    setStoredData((prevData) => {
      const updatedData = [...prevData, newRecord];

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      } catch (error) {
        console.error("Failed to save data:", error);
      }

      return updatedData;
    });
  }, []);

  return { storedData, addData };
};
