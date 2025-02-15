import { CLEAR_SELECTED_PLAYER, SET_SELECTED_PLAYER } from '../constants';

export const setSelectedPlayer = (player) => ({
  type: SET_SELECTED_PLAYER,
  payload: player,
});

export const clearSelectedPlayer = () => ({
  type: CLEAR_SELECTED_PLAYER,
});