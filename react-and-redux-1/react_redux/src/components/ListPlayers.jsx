import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPlayer } from "../redux/actionCreators/selectedPlayerActions.js";
import { setStatus } from "../redux/actionCreators/statusActions.js";
import { REQ_STATUS } from "../../cypress/e2e/constants.js";
import { ListPlayer } from "./ListPlayer";

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
