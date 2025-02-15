import { SET_REQUEST_STATUS } from "../constants";
import { REQ_STATUS } from "../../../cypress/e2e/constants";

const statusReducer = (state = REQ_STATUS.loading, action) => {
  switch (action.type) {
    case SET_REQUEST_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;