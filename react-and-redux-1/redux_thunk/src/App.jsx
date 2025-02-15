/** @format CONTAINERS
 *  In this exercise, you will be integrating thunk, which is a middleware that allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
 *
 * The fetch functions will be moved into the thunk action creators. Each action creator will be responsible for handling the request while keeping the application up to date with loading, success, and failure actions.
 * You can find the template files for the action creators in the src/redux/actionCreators/thunks folder. Each thunk has been separated based on the component that will be using it, and can be found in the corresponding folder with the same name as the component.
 *
 * At the end of the day, in an ideal situation, your app should function with the current template jsx and logic(see below), with the fetch functions moved into the thunk action creators and possible hooks moved to the components that need them.
 *
 * You can however copy paste the App.jsx file from the previous exercises into this file so that you may start off with a working app.
 */

import { RequestStatus } from "./components/RequestStatus.jsx";
import { AddPlayer } from "./components/AddPlayer.jsx";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { setPlayers } from "./redux/actionCreators/playersActions.js";
import { setStatus } from "./redux/actionCreators/statusActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
      <AddPlayer />
      <ListPlayers />
      {selectedPlayer && selectedPlayer.id && <SelectedPlayer />} {/* Ensure player is selected before rendering */}    </>
  );
}
export default App;
