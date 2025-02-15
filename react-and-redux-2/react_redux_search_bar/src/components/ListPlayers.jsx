import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPlayer } from "../redux/actionCreators/selectedPlayerActions.js";
import { setStatus } from "../redux/actionCreators/statusActions.js";
import { REQ_STATUS } from "../../cypress/e2e/constants.js";
import { ListPlayer } from "./ListPlayer";

export const ListPlayers = () => {
  const players = useSelector((state) => state.players);
  // Fallback to an empty string if searchQuery is undefined.
  const searchQuery = useSelector((state) => state.searchQuery) || "";
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

  // Filter players based on the search query (case-insensitive).
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="players-list">
      <h2>List of players</h2>
      <ul>
        {filteredPlayers.map((player) => (
          <ListPlayer
            key={player.id}
            player={player}
            onClick={handleSelectPlayer}
          />
        ))}
      </ul>
    </div>
  );
};

export default ListPlayers;
