import { SET_REQUEST_STATUS } from '../constants';
/** @format NORMAL ACTION CREATORS */

// STATUS ACTION CREATORS

/**
 * @description a normal action creator that returns an action with type SET_STATUS to the frontends reducers along with the payload that includes status.
 * @param {String} status - The status that is to be stored in state
 * @return {Object} action
 */
export const setStatus = (status) => ({
  type: SET_REQUEST_STATUS,
  payload: status,
});