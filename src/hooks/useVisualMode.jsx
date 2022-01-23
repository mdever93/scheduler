import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])
  const transition = (x, replace = false) => {
    setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), x] : [...prev, x]     );

    // setMode(x);
    // setHistory([...history, x]);
  }
  function back() {     if (history.length < 2) return;
    setHistory(prev => [...prev.slice(0, history.length - 1)])}
  // const back = () => {
  //   if (history.length > 1) {
  //     setHistory((prev) => {
  //       return [...prev.slice(0, history.length - 1)]
  //     })
  //     // history.pop()
  //   }
  //   setMode(history[history.length - 1])
  // }
  console.log('MODE', history[history.length - 1]);
  console.log('HISTORY', history);
  return {
    mode: history[history.length - 1],
    transition,
    back
  }
}