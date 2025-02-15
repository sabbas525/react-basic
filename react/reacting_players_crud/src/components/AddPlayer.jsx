/** @format
 *
 * Short instructions:
 * Create a AddPlayer component.
 *
 * handleSubmit is a prop function that will be called when the form is submitted.
 *
 * REMEMBER: use right ids, classes and attributes in the exercise, refer to the tests.
 *
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
    <form onSubmit={onSubmit}>
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
