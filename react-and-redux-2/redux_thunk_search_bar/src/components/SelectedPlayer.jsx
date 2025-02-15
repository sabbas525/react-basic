import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSelectedPlayer, updateSelectedPlayer } from '../redux/actionCreators/thunks/SelectedPlayer';
import { REQ_STATUS } from "../../cypress/e2e/constants";

export const SelectedPlayer = () => {
  const dispatch = useDispatch();
  const selectedPlayer = useSelector((state) => state.selectedPlayer);
  const globalStatus = useSelector((state) => state.status);

  // Initialize the active state for the player.
  const [isActive, setIsActive] = useState(selectedPlayer?.isActive ?? false);
  // New state variable to track if an update is in progress.
  const [isUpdating, setIsUpdating] = useState(false);

  if (!selectedPlayer || !selectedPlayer.id) {
    return null;
  }

  const handleDelete = () => {
    dispatch(deleteSelectedPlayer());
  };

  const handleUpdate = () => {
    // Set the updating state to true so that the update button remains disabled.
    setIsUpdating(true);
    dispatch(updateSelectedPlayer(isActive));
  };

  return (
    <div id="selected-player">
      <h3>Selected Player</h3>
      <p id="player-name">{selectedPlayer.name}</p>
      
      <div>
        <label htmlFor="checkbox" id="checkbox-label">
          Player Active
        </label>
        <input
          type="checkbox"
          id="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
          style={{ width: "50px", height: "50px" }}
        />
      </div>

      {/* Use the state variable "isUpdating" to control the disabled prop */}
      <button className="btn-update" onClick={handleUpdate} disabled={isUpdating}>
        Update
      </button>
      <button className="btn-delete" onClick={handleDelete}>
        Delete
      </button>

      <p id="player-status">
        {isActive ? 'active' : 'inactive'}
      </p>
    </div>
  );
};

export default SelectedPlayer;
