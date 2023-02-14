import { useCallback, useEffect, useRef, useState } from "react";

const useStockfish = () => {
  const engine = useRef();
  const BEST_MOVE_REG = /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/;
  const [engineMessages, setEngineMessages] = useState([]);
  const [engineInitialized, setEngineInitialized] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const [engineWorking, setEngineWorking] = useState(false);
  const [bestMoveFound, setBestMoveFound] = useState(false);
  const [bestMove, setBestMove] = useState(null);
  const handleMessage = useCallback((e) => {
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
    }
  }, []);

  const sendCommand = useCallback((command) => {
    engine?.current.postMessage(command);
  }, []);

  const findBestMove = useCallback(
    (moveHistory) => {
      if (engineInitialized && engineReady && !engineWorking) {
        setEngineWorking(true);
        setBestMove(null);
        sendCommand(`position startpos moves ${moveHistory}`);
        sendCommand("go");
      } else {
        return;
      }
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
    sendCommand("setoption name Ponder value true");
  }, [sendCommand]);

  useEffect(() => {
    sendCommand("isready");
    sendCommand("ucinewgame");
  }, [sendCommand]);

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
