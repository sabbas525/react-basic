import { REQ_STATUS } from "../../../../cypress/e2e/constants";
import { setSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

export const getSelectedPlayer = (id) => async (dispatch) => {
  dispatch(setStatus(REQ_STATUS.loading));

  try {
    const response = await fetch(`http://localhost:3001/api/players/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch player');
    }
    const player = await response.json();
    dispatch(setStatus(REQ_STATUS.success));
    dispatch(setSelectedPlayer(player));
  } catch (error) {
    dispatch(setStatus(REQ_STATUS.error));
  }
};
