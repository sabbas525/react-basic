/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
import { useState, useEffect } from 'react';

export const SelectedPlayer = ({ player, handleDelete, handleUpdate }) => {
  const [isActive, setIsActive] = useState(player?.isActive);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (player) {
      setIsActive(player.isActive);
      setIsChanged(false);
    }
  }, [player]);

  if (!player) return null;

  const handleCheckboxChange = () => {
    const newValue = !isActive;
    setIsActive(newValue);
    // Only set isChanged if the new value is different from the original
    setIsChanged(newValue !== player.isActive);
  };

  return (
    <div id="selected-player">
      <div id="player-name">{player.name}</div>
      <div id="player-status">{isActive ? "active" : "inactive"}</div>
      <label id="checkbox-label">
        <input
          type="checkbox"
          id="checkbox"
          checked={isActive}
          onChange={handleCheckboxChange}
        />
        Active
      </label>
      <button 
        className="btn-delete" 
        onClick={() => handleDelete(player.id)}
      >
        Delete
      </button>
      <button 
        className="btn-update" 
        disabled={!isChanged}
        onClick={() => handleUpdate(isActive)}
      >
        Update
      </button>
    </div>
  );
};
