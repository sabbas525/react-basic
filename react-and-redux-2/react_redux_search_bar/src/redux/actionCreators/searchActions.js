import { SET_SEARCH_QUERY } from '../constants';

/**
 * @description Returns an action with type SET_SEARCH_QUERY and the provided query payload.
 * @param {String} query - The query that is to be stored in state.
 * @return {Object} action
 */
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});
