import { REQ_STATUS } from "../../../../cypress/e2e/constants";
import { addPlayer } from "../playersActions";
import { clearSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

// Provide a default newPlayer so that postPlayer() (without an argument) returns the same thunk as when the input is empty.
export const postPlayer = (newPlayer = { name: "", isActive: false }) => async (dispatch) => {
  dispatch(setStatus(REQ_STATUS.loading));

  try {
    const response = await fetch("http://localhost:3001/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    dispatch(setStatus(REQ_STATUS.success));
    dispatch(addPlayer(data));
    dispatch(clearSelectedPlayer());
  } catch (error) {
    dispatch(setStatus(REQ_STATUS.error));
  }
};
