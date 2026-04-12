// Room Form Component
import { useState } from 'react';

const RoomForm = ({ onCreate, onJoin }) => {
  const [roomId, setRoomId] = useState('');

  const handleCreateRoom = () => {
    onCreate();
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
      onJoin(roomId);
    }
  };

  return (
    <div className="room-form">
      <h1>Tic-Tac-Toe</h1>
      
      <div className="form-section">
        <button onClick={handleCreateRoom} className="btn btn-primary btn-large">
          Create New Room
        </button>
      </div>

      <div className="divider">
        <span>OR</span>
      </div>

      <div className="form-section">
        <form onSubmit={handleJoinRoom}>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
            placeholder="Enter room ID"
            maxLength={6}
            className="room-input"
          />
          <button type="submit" className="btn btn-secondary btn-large">
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;
