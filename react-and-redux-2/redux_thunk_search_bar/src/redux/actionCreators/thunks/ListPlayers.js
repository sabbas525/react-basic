/** @format THUNK*/

/**
 * @description thunk for getting all players.
 * Whenever called, dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setPlayers-action with response array as param
 * If Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 */
import { REQ_STATUS } from "../../../../cypress/e2e/constants";
import { setPlayers } from "../playersActions";
import { setStatus } from "../statusActions";

export const getPlayers = () => async (dispatch) => {
  dispatch(setStatus(REQ_STATUS.loading)); // Dispatch loading status
  
  try {
    const response = await fetch("http://localhost:3001/api/players");
    
    // Check if the response is successful (status code 200-299)

    if (!response.ok) {
      throw new Error("Failed to fetch players");
    }

    // Parse the response body to JSON
    const data = await response.json();

    // Map the player data as needed
    const players = data.map((player) => ({
      id: player.id,
      name: player.name,
    }));

    // Dispatch success status and players list to Redux store
    dispatch(setStatus(REQ_STATUS.success));
    dispatch(setPlayers(players)); // Update store with fetched players data
  } catch (error) {
    dispatch(setStatus(REQ_STATUS.error)); // Handle error if the request fails
    console.error("Error fetching players:", error);
  }
};
