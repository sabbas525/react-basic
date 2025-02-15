import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setPlayers } from "./redux/actionCreators/playersActions.js";
import { useEffect } from "react";
import { setStatus } from "./redux/actionCreators/statusActions.js";
import { REQ_STATUS } from "../cypress/e2e/constants.js";

function App() {
  const selectedPlayer = useSelector((state) => state.selectedPlayer);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status.status); // Accessing status from Redux

  useEffect(() => {
    dispatch(setStatus(REQ_STATUS.loading)); // Set status to loading
    
    fetch("http://localhost:3001/api/players")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPlayers(data)); // Set players in Redux
        dispatch(setStatus(REQ_STATUS.success)); // Set status to success
      })
      .catch((err) => {
        console.error("Error fetching players:", err);
        dispatch(setStatus(REQ_STATUS.error)); // Set status to error
      });
  }, [dispatch]);
  return (

    <>
      <RequestStatus />
      <ListPlayers />
      {selectedPlayer && selectedPlayer.id && <SelectedPlayer />} {/* Ensure player is selected before rendering */}
    </>
  );
}

export default App;