// Board Component
import { useEffect } from 'react';
import Cell from './Cell';

const Board = ({ board, onMove, currentPlayer, mySymbol, status, winner, onNewGame }) => {
  const isGameOver = status !== 'playing';
  const isMyTurn = !isGameOver && currentPlayer === mySymbol;

  useEffect(() => {
    console.log("rerender board")
  },[])

  return (
    <div className="board">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onMove(index)}
          disabled={!isMyTurn || isGameOver}
          isWinner={winner && winner === value}
        />
      ))}
    </div>
  );
};

export default Board;
