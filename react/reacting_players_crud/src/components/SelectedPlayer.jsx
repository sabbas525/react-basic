/**
 * Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.
 *
 * Call the "handleUpdate"
 * prop function when the update button is clickable and the user clicks it.
 * In the App.jsx, this should trigger the updating of the player in the backend.
 *
 * Likewise, add logic to call the "handleDelete" prop function when the user
 * clicks the delete button. In the App.jsx, this should trigger the deletion of the player in the backend.
 *
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
