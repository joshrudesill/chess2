const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { useRef, useState } = require("react");
const useTimer = (timeF) => {
  const [ms, setMS] = useState(0);
  const [formattedTime, setFT] = useState("00:00");
  const startTimeRef = useRef(null);
  const intermediateTimeRef = useRef(null);
  const totalTimeMS = useRef(null);
  const timerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const initTimer = (startTime, timeF) => {
    startTimeRef.current = dayjs(startTime).utc();
    totalTimeMS.current = 60000 * timeF;
    setFT(`${timeF}:00`);
  };
  const startTimer = (startTime) => {
    clearInterval(timerRef.current);
    startTimeRef.current = startTime;
    totalTimeMS.current = 60000 * timeF;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      const diff = startTimeRef.current.diff(dayjs().utc(), "ms");
      setMS(diff);

      const ctd = totalTimeMS.current - Math.abs(diff);
      var ftm;
      var fts;
      if (ctd >= 60000) {
        ftm = Math.floor(ctd / 60000);
        fts = ctd % 60000;
      } else {
        ftm = 0;
        fts = Math.floor(ctd / 1000);
      }
      setFT(`${ftm}:${Math.floor(fts / 1000)}`);
    }, 100);
  };
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };
  const resumeTimerWithOffset = (myOffset) => {
    clearInterval(timerRef.current);
    setIsRunning(true);
    setIsPaused(false);
    intermediateTimeRef.current = dayjs().utc().subtract(myOffset, "ms");
    timerRef.current = setInterval(() => {
      const diff = intermediateTimeRef.current.diff();
      setMS(diff);
      const ctd = totalTimeMS.current - Math.abs(diff);
      var ftm;
      var fts;
      if (ctd >= 60000) {
        ftm = Math.floor(ctd / 60000);
        fts = Math.floor((ctd % 60000) / 1000);
      } else {
        ftm = 0;
        fts = Math.floor(Math.floor(ctd / 1000) / 1000);
      }
      setFT(`${ftm}:${fts < 10 ? `0${fts}` : fts}`);
    }, 100);
  };
  const resumeTimer = (moveTime) => {
    const lastOffset = ms;
    clearInterval(timerRef.current);
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
    resumeTimerWithOffset,
    formattedTime,
    initTimer,
    intermediateTimeRef,
  };
};

export default useTimer;
