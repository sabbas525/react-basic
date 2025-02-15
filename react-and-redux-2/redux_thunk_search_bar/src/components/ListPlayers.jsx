import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPlayer } from "../redux/actionCreators/selectedPlayerActions.js";
import { setStatus } from "../redux/actionCreators/statusActions.js";
import { REQ_STATUS } from "../../cypress/e2e/constants.js";
import { ListPlayer } from "./ListPlayer";
import { fetchFilteredPlayers } from "../redux/actionCreators/thunks/fetchFilteredPlayers";
/** @format
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getPlayers, found in src\redux\actionCreators\thunks\ListPlayers.jsx
 */

export const ListPlayers = () => {
  // Select the filteredPlayers array from the Redux store.
  const { filteredPlayers } = useSelector((state) => state.players);
  const dispatch = useDispatch();

  // Local state to hold the current search term.
  const [searchTerm, setSearchTerm] = useState("");

  // Update searchTerm and dispatch filtering thunk.
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(fetchFilteredPlayers(term));
  };

  // Handler for selecting a player.
  const handleSelectPlayer = (playerId) => {
    dispatch(setStatus(REQ_STATUS.loading));
    fetch(`http://localhost:3001/api/players/${playerId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setSelectedPlayer(data));
        dispatch(setStatus(REQ_STATUS.success));
      })
      .catch((err) => {
        console.error("Error fetching player:", err);
        dispatch(setStatus(REQ_STATUS.error));
      });
  };

  return (
    <div id="players-list">
      <h2>List of players</h2>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search players by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
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

