import { SET_REQUEST_STATUS } from '../constants';

export const setStatus = (status) => ({
  type: SET_REQUEST_STATUS,
  payload: status,
});