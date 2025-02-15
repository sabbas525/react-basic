import { CLEAR_SELECTED_PLAYER, SET_SELECTED_PLAYER } from '../constants';

const selectedPlayerReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SELECTED_PLAYER:
      return action.payload;
    case CLEAR_SELECTED_PLAYER:
      return {};  // return null when clearing the selected player
    default:
      return state;  // return the current state if no action type matches
  }
};

export default selectedPlayerReducer;
