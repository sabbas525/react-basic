import { SET_SEARCH_QUERY } from '../constants';

const initialState = '';

/**
 * @description Reducer function for handling search queries.
 * It updates the state with the search query string.
 *
 * @param {string} state - The current search query state.
 * @param {Object} action - The action to be performed.
 * @returns {string} - The updated search query state.
 */
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
