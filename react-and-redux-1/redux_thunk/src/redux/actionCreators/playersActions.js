import { ADD_PLAYER, REMOVE_PLAYER, SET_PLAYERS, UPDATE_PLAYER } from "../constants";

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  payload: players,
});

export const addPlayer = (player) => ({
  type: ADD_PLAYER,
  payload: player,
});

// Now returns payload as an object { id: playerId } to match test expectations.
export const removePlayer = (playerId) => ({
  type: REMOVE_PLAYER,
  payload: { id: playerId },
});

export const updatePlayer = (player) => ({
  type: UPDATE_PLAYER,
  payload: player,
});
