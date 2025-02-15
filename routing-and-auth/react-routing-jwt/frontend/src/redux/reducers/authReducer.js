import { SET_USER_AUTH, LOGOUT_USER, AUTH_ERROR } from "../actionTypes";

const initialState = {
  user: null, // user is initially null (guest)
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH:
      // Set the user and clear previous errors.
      return { ...state, user: action.payload, error: null };
    case LOGOUT_USER:
      return { ...initialState, user: { role: "guest" } };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
