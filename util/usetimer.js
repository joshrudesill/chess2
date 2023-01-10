const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { useRef, useState } = require("react");
const useTimer = (timeF) => {
  const [ms, setMS] = useState(0);
  const [formattedTime, setFT] = useState("00:00");
  const startTimeRef = useRef(null);
  const intermediateTimeRef = useRef(null);
  const onTimeOut = useRef(null);
  const totalTimeMS = useRef(null);
  const timerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const isRunning = useRef(false);

  const initTimer = (startTime, timeF, ontimeout) => {
    startTimeRef.current = dayjs(startTime).utc();
    totalTimeMS.current = 60000 * timeF;
    //bug possible \/
    onTimeOut.current = ontimeout;
    setFT(`${timeF}:00`);
  };
  const startTimer = (startTime) => {
    clearInterval(timerRef.current);
    startTimeRef.current = startTime;
    totalTimeMS.current = 60000 * timeF;

    timerRef.current = setInterval(() => {
      const diff = startTimeRef.current.diff(dayjs().utc(), "ms");
      setMS(diff);
      if (diff >= totalTimeMS.current) {
        timeOut();
      } else {
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
        const timeFormatted = `${ftm}:${Math.floor(fts)}`;
        if (timeFormatted !== formattedTime) {
          //to prevent unnecessary re-renders
          setFT(timeFormatted);
        }
      }
    }, 100);
  };
  const timeOut = () => {
    timerRef.current = null;
    onTimeOut.current();
    isRunning.current = false;
    setMS(totalTimeMS.current);
    setFT("0:00");
  };
  const stopTimer = () => {
    console.log("stopping timer");
    clearInterval(timerRef.current);
    setIsPaused(true);
    isRunning.current = false;
  };
  const resumeTimerWithOffset = (myOffset) => {
    if (!isRunning.current) {
      console.log("starting timer with ", myOffset, "ms");
      clearInterval(timerRef.current);
      isRunning.current = true;
      setIsPaused(false);
      intermediateTimeRef.current = dayjs().utc().subtract(myOffset, "ms");
      timerRef.current = setInterval(() => {
        const diff = intermediateTimeRef.current.diff();
        setMS(diff);
        if (Math.abs(diff) >= totalTimeMS.current) {
          setFT("0:00");
          clearInterval(timerRef.current);
          timeOut();
        } else {
          const ctd = totalTimeMS.current - Math.abs(diff);
          var ftm;
          var fts;
          if (ctd >= 60000) {
            ftm = Math.floor(ctd / 60000);
            fts = Math.floor((ctd % 60000) / 1000);
          } else {
            ftm = 0;
            fts = Math.floor(ctd / 1000);
          }
        }
        setFT(`${ftm}:${fts < 10 ? `0${fts}` : fts}`);
      }, 100);
    }
  };
  const updateTimerToOffset = (offset) => {
    clearInterval(timerRef.current);
    isRunning.current = false;
    const diff = dayjs().utc().subtract(offset, "ms").diff();
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
    updateTimerToOffset,
  };
};

export default useTimer;
