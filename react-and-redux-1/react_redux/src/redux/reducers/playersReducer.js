import { SET_PLAYERS } from '../constants';

const playersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return action.payload;
    default:
      return state;
  }
};

export default playersReducer;