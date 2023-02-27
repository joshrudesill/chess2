import { useCallback, useEffect, useRef, useState } from "react";

const useStockfish = (onBestMove) => {
  const engine = useRef();
  const BEST_MOVE_REG = /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/;
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const [engineMessages, setEngineMessages] = useState([]);
  const [engineInitialized, setEngineInitialized] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const [engineWorking, setEngineWorking] = useState(false);
  const [bestMoveFound, setBestMoveFound] = useState(false);
  const [bestMove, setBestMove] = useState(null);
  const handleMessage = useCallback(
    (e) => {
      const line = typeof e === "object" ? e.data : e;
      console.log(line);
      setEngineMessages((engineMessages) => [...engineMessages, line]);
      if (line === "uciok") {
        setEngineInitialized(true);
        return;
      }
      if (line === "readyok") {
        setEngineReady(true);
        return;
      }
      if (BEST_MOVE_REG.test(line)) {
        setEngineWorking(false);
        setBestMoveFound(true);
        const [, from, to, promotion] = line.match(BEST_MOVE_REG);
        setBestMove({ from, to, promotion });
        const startingY = files.indexOf(from[0]);
        const startingX = 8 - Number(from[1]);
        const endingY = files.indexOf(to[0]);
        const endingX = 8 - Number(to[1]);
        onBestMove(startingX, startingY, endingX, endingY, promotion);
      }
    },
    [onBestMove]
  );

  const sendCommand = useCallback((command) => {
    setEngineMessages((engineMessages) => [...engineMessages, command]);
    engine?.current.postMessage(command);
  }, []);

  const findBestMove = useCallback(
    (moveHistory) => {
      setEngineWorking(true);
      setBestMove(null);
      sendCommand(
        `position startpos moves ${moveHistory.reduce((a, cv) => `${a} ${cv}`)}`
      );
      sendCommand("go");
    },
    [sendCommand]
  );

  useEffect(() => {
    var stockfish = new Worker("src/stockfish.js");
    engine.current = stockfish;
  }, []);
  useEffect(() => {
    if (engine.current) {
      engine.current.onmessage = handleMessage;
    }
  }, [handleMessage]);

  useEffect(() => {
    sendCommand("uci");
  }, [sendCommand]);

  useEffect(() => {
    if (engineInitialized) {
      sendCommand("setoption name Ponder value true");
      sendCommand("setoption name Minimum Thinking Time value 500");
      sendCommand("isready");
    }
  }, [sendCommand, engineInitialized]);
  useEffect(() => {
    if (engineReady) {
      sendCommand("ucinewgame");
    }
  }, [sendCommand, engineReady]);

  useEffect(() => {
    return () => {
      sendCommand("quit");
    };
  }, [sendCommand]);

  return {
    engineMessages,
    engineInitialized,
    engineReady,
    engineWorking,
    bestMoveFound,
    bestMove,
    findBestMove,
  };
};
export default useStockfish;
