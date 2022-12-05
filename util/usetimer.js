const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
const { useRef, useState } = require("react");
dayjs.extend(utc);
const useTimer = (startTime) => {
  const [playerOneMS, setPlayerOneMS] = useState(0);
  const [playerTwoMS, setPlayerTwoMS] = useState(0);
  const startTimeRef = useRef(null);
  const intermediateTimeRefOne = useRef(null);
  const intermediateTimeRefTwo = useRef(null);
  const timerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    clearInterval(timerRef.current);
    startTimeRef.current = dayjs(startTime).utc();
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      const diff = startTimeRef.current.diff(dayjs().utc(), "ms");
      setMS(diff);
    }, 100);
  };
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };
  const resumeTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(false);
    intermediateTimeRef.current =
      startTimeRef.current.diff(dayjs().utc(), "ms") - ms;
    timerRef.current = setInterval(() => {
      const diff =
        startTimeRef.current.diff(dayjs().utc(), "ms") -
        intermediateTimeRef.current;
      setMS(diff);
    }, 100);
  };
  const clearTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    startTimeRef.current = null;
    intermediateTimeRef.current = null;
    setIsRunning(false);
    setIsPaused(false);
    setMS(0);
  };

  return {
    ms,
    isPaused,
    isRunning,
    startTimeRef,
    startTimer,
    stopTimer,
    clearTimer,
    resumeTimer,
  };
};

export default useTimer;
