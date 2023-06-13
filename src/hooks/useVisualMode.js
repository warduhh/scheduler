import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1] = newMode;
        return newHistory;
      });
    } else {
      setHistory((prevHistory) => [...prevHistory, newMode]);
    }
    setMode(newMode);
  }
  

  function back() {
    if (history.length > 1) {
      // Remove the last mode from history
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);

      // Set the mode to the previous mode
      const previousMode = newHistory[newHistory.length - 1];
      setMode(previousMode);
    }
  }
  return { mode, transition, back };
}