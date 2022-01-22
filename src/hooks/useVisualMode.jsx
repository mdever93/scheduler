import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])
  const transition = (x) => {
    setMode(x);
    setHistory([...history, x]);
  }
  const back = () => {
    history.pop()
    setMode(history[history.length - 1])
  }
  console.log('MODE', mode);
  return {
    mode,
    transition,
    back
  }
}