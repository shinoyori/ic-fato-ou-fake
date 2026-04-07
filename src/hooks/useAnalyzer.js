import { useState, useCallback } from "react";
import { runModel } from "../utils/models";

/**
 * Manages the text input, selected method, result state, and the
 * async analysis runner with a simulated loading delay.
 */
export function useAnalyzer() {
  const [text,    setText]    = useState("");
  const [method,  setMethod]  = useState("naive_bayes");
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);

  const changeText = useCallback((val) => {
    setText(val);
    setResult(null);
  }, []);

  const changeMethod = useCallback((val) => {
    setMethod(val);
    setResult(null);
  }, []);

  const analyze = useCallback(() => {
    if (text.trim().length < 10 || loading) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(runModel(method, text));
      setLoading(false);
    }, 800);
  }, [text, method, loading]);

  return { text, method, result, loading, changeText, changeMethod, analyze };
}
