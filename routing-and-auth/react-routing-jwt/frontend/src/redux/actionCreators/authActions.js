import axios from "axios";
import {
  SET_USER_AUTH,
  LOGOUT_USER,
  AUTH_ERROR
} from "../actionTypes";
import { showNotification } from "./notificationActions";

axios.defaults.baseURL = "http://localhost:3001";

// Check auth status (already implemented)
export const checkAuthStatus = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/check-status", {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.user) {
        dispatch({
          type: SET_USER_AUTH,
          payload: response.data.user,
        });
      } else {
        dispatch({
          type: SET_USER_AUTH,
          payload: { role: "guest" },
        });
      }
    } catch (error) {
      dispatch(authError("Failed to check authentication status"));
    }
  };
};

export const setUserAuth = (user) => ({
  type: SET_USER_AUTH,
  payload: user,
});

// logoutUser (unchanged except that you might remove extra CLEAR_* actions if not needed)
export const logoutUser = (navigate, returnPath, userRole) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch({ type: LOGOUT_USER });
        // Optionally dispatch CLEAR_USERS if needed:
        // dispatch({ type: CLEAR_USERS });
        dispatch(showNotification("Logout successful", "auth", "success"));
        if (userRole === "admin" && returnPath === 'localhost:3001/products') {
          window.location.href = returnPath;
        } else {
          navigate("/login");
        }
      } else {
        dispatch(showNotification("Logout failed.", "auth", "error"));
      }
    } catch (error) {
      let message = "Logout failed. Please try again.";
      if (error.response && error.response.data) {
        message = error.response.data.message || message;
      }
      dispatch(showNotification(message, "auth", "error"));
    }
  };
};

export const authError = (error) => ({
  type: AUTH_ERROR,
  payload: error,
});

export const registerUser = (userData, navigate) => {
  return async (dispatch) => {
    dispatch(showNotification("Registering user...", "auth", "loading"));
    try {
      const response = await axios.post("/api/register", userData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        dispatch({
          type: SET_USER_AUTH,
          payload: response.data.user,
        });
        dispatch(
          showNotification("User registered successfully", "auth", "success")
        );
        navigate("/"); // Redirect to home page
      } else {
        dispatch(showNotification("Registration failed.", "auth", "error"));
      }
    } catch (error) {
      dispatch(
        showNotification("Registration failed. Please try again.", "auth", "error")
      );
    }
  };
};

/**
 * Action creator for logging in a user.
 */
export const loginUser = (credentials, navigate) => {
  return async (dispatch) => {
    // Dispatch a loading notification
    dispatch(showNotification("Logging in...", "auth", "loading"));
    try {
      const response = await axios.post("/api/login", credentials, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.user) {
        dispatch({
          type: SET_USER_AUTH,
          payload: response.data.user,
        });
        dispatch(showNotification("Login successful", "auth", "success"));
        navigate("/");
      } else {
        dispatch(showNotification("Login failed.", "auth", "error"));
      }
    } catch (error) {
      dispatch(
        showNotification("Login failed. Please try again.", "auth", "error")
      );
    }
  };
};
