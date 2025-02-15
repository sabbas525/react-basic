import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSelectedPlayer, updateSelectedPlayer } from '../redux/actionCreators/thunks/SelectedPlayer';
import { REQ_STATUS } from "../../cypress/e2e/constants";

export const SelectedPlayer = () => {
  const dispatch = useDispatch();
  const selectedPlayer = useSelector((state) => state.selectedPlayer);
  // (globalStatus is no longer used to compute disabled, but we keep it in case you need it)
  const globalStatus = useSelector((state) => state.status);

  // Safely initialize the active state (if no selectedPlayer exists, default to false)
  const [isActive, setIsActive] = useState(selectedPlayer?.isActive ?? false);

  // Create a ref for the Update button so we can disable it immediately
  const updateButtonRef = useRef(null);

  // If no selected player exists (or its id is missing), do not render anything.
  if (!selectedPlayer || !selectedPlayer.id) {
    return null;
  }

  const handleDelete = () => {
    dispatch(deleteSelectedPlayer());
  };

  const handleUpdate = () => {
    // Immediately disable the update button via its ref
    if (updateButtonRef.current) {
      updateButtonRef.current.disabled = true;
    }
    // Dispatch the PUT request thunk (which will eventually update the store).
    // In our app, on success the selected player is cleared (thus unmounting this component),
    // and on failure we do not re-enable the button (per test expectations).
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

      <button className="btn-update" onClick={handleUpdate} ref={updateButtonRef}>
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
