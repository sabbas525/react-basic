import { SET_PLAYERS } from '../constants';

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  payload: players,
});