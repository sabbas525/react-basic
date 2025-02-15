import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayers } from "./redux/actionCreators/playersActions.js";
import { setStatus } from "./redux/actionCreators/statusActions.js";
import { REQ_STATUS } from "../cypress/e2e/constants.js";

import { RequestStatus } from "./components/RequestStatus.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";

function App() {
  const selectedPlayer = useSelector((state) => state.selectedPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set loading status and fetch players.
    dispatch(setStatus(REQ_STATUS.loading));
    
    fetch("http://localhost:3001/api/players")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPlayers(data));
        dispatch(setStatus(REQ_STATUS.success));
      })
      .catch((err) => {
        console.error("Error fetching players:", err);
        dispatch(setStatus(REQ_STATUS.error));
      });
  }, [dispatch]);

  return (
    <>
      <RequestStatus />
      <SearchBar />
      <ListPlayers />
      {selectedPlayer && selectedPlayer.id && <SelectedPlayer />}
    </>
  );
}

export default App;
