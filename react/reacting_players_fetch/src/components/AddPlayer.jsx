/** @format
 *
 * Short instructions
 * ------------------
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
import { useState } from "react";

export const AddPlayer = ({ handleSubmit }) => {
  const [name, setName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(name); // Pass only the name
    setName(""); // Clear input field after submission
  };

  return (
    <div>
      <h2>Add Player</h2>
      <form id="add-player-form" onSubmit={handleFormSubmit}>
        <input
          id="input-player"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button id="submit-player" className="btn-add" type="submit">
          Add Player
        </button>
      </form>
    </div>
  );
};