import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPlayer } from "../redux/actionCreators/selectedPlayerActions.js";
import { setStatus } from "../redux/actionCreators/statusActions.js";
import { REQ_STATUS } from "../../cypress/e2e/constants.js";
import { ListPlayer } from "./ListPlayer";
/** @format
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getPlayers, found in src\redux\actionCreators\thunks\ListPlayers.jsx
 */
export const ListPlayers = () => {
  const players = useSelector((state) => state.players); // Fetch players from Redux
  const dispatch = useDispatch();

  const handleSelectPlayer = (playerId) => {
    dispatch(setStatus(REQ_STATUS.loading)); // Set loading status

    // Fetch the player's details
    fetch(`http://localhost:3001/api/players/${playerId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setSelectedPlayer(data)); // Dispatch fetched player data
        dispatch(setStatus(REQ_STATUS.success)); // Set success status
      })
      .catch((err) => {
        console.error("Error fetching player:", err);
        dispatch(setStatus(REQ_STATUS.error)); // Set error status
      });
  };

  return (
    <div id="players-list">
      <h2>List of players</h2>
      <ul>
        {players.map((player) => (
          <ListPlayer
            key={player.id}
            player={player} // Pass the entire player object
            onClick={handleSelectPlayer} // Pass the handler function
          />
        ))}
      </ul>
    </div>
  );
};

export default ListPlayers;
