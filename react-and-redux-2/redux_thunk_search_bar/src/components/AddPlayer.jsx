import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPlayer } from '../redux/actionCreators/thunks/AddPlayer';

export const AddPlayer = () => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Always dispatch the thunk with a new player object.
    // (The thunk’s default parameter also handles the empty case.)
    dispatch(postPlayer({ name: playerName, isActive: false }));
    setPlayerName('');
  };

  return (
    <div>
      <h2>Add Player</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input-player">Player Name: </label>
          <input
            type="text"
            id="input-player"
            value={playerName}
            onChange={handleInputChange}
            placeholder="Enter player name"
            aria-label="Player Name"
          />
        </div>
        <button type="submit" className="btn-add">Add Player</button>
      </form>
    </div>
  );
};

export default AddPlayer;
