import { ADD_PLAYER, REMOVE_PLAYER, SET_PLAYERS, UPDATE_PLAYER } from "../constants";

const initialState = [];

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return action.payload;
    case ADD_PLAYER:
      return [...state, action.payload];
    case REMOVE_PLAYER:
      // Now compares player.id to action.payload.id
      return state.filter(player => player.id !== action.payload.id);
    case UPDATE_PLAYER:
      return state.map(player =>
        player.id === action.payload.id ? action.payload : player
      );
    default:
      return state;
  }
};

export default playersReducer;
