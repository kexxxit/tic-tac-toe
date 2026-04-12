// Cell Component
import './Cell.css';

const Cell = ({ value, onClick, disabled, isWinner }) => {
  const cellClass = `cell ${disabled ? 'disabled' : ''} ${isWinner ? 'winner' : ''}`;
  
  return (
    <button className={cellClass} onClick={onClick} disabled={disabled}>
      {value === 'X' && <span className="symbol x">X</span>}
      {value === 'O' && <span className="symbol o">O</span>}
    </button>
  );
};

export default Cell;
