import { REQ_STATUS } from "../../../../cypress/e2e/constants";
import { updatePlayer, removePlayer } from "../playersActions";
import { clearSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

export const deleteSelectedPlayer = () => async (dispatch, getState) => {
  const selectedPlayer = getState().selectedPlayer;

  dispatch(setStatus(REQ_STATUS.loading));

  try {
    const response = await fetch(`http://localhost:3001/api/players/${selectedPlayer.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(setStatus(REQ_STATUS.success));
      dispatch(removePlayer(selectedPlayer.id));
      dispatch(clearSelectedPlayer());
    } else {
      throw new Error('Failed to delete the player');
    }
  } catch (error) {
    dispatch(setStatus(REQ_STATUS.error));
  }
};

export const updateSelectedPlayer = (updatedActivity) => async (dispatch, getState) => {
  const selectedPlayer = getState().selectedPlayer;
  const updatedPlayer = {
    ...selectedPlayer,
    isActive: updatedActivity,
  };

  dispatch(setStatus(REQ_STATUS.loading));

  try {
    const response = await fetch(`http://localhost:3001/api/players/${selectedPlayer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlayer),
    });

    if (response.ok) {
      const updatedResponse = await response.json();
      dispatch(setStatus(REQ_STATUS.success));
      dispatch(updatePlayer(updatedResponse));
      dispatch(clearSelectedPlayer());
    } else {
      throw new Error('Failed to update the player');
    }
  } catch (error) {
    dispatch(setStatus(REQ_STATUS.error));
  }
};
