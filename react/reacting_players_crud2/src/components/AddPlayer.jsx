/** @format
 *
 * Short instructions
 * ------------------
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
import { useState } from 'react';

export const AddPlayer = ({ handleSubmit }) => {
  const [playerName, setPlayerName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(playerName);
    setPlayerName("");
  };

  return (
    <form id="submit-player" onSubmit={onSubmit}>
      <input
        id="input-player"
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button type="submit" className="btn-add">Add Player</button>
    </form>
  );
};

