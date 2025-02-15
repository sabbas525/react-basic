import { 
  ADD_PLAYER, 
  REMOVE_PLAYER, 
  SET_PLAYERS, 
  UPDATE_PLAYER, 
  SET_FILTERED_PLAYERS 
} from "../constants";

const initialState = {
  players: [],
  filteredPlayers: []
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return { 
        players: action.payload, 
        filteredPlayers: action.payload 
      };

    case SET_FILTERED_PLAYERS:
      return { 
        ...state, 
        filteredPlayers: action.payload 
      };

    case ADD_PLAYER: {
      const newPlayers = [...state.players, action.payload];
      return { 
        players: newPlayers, 
        filteredPlayers: newPlayers 
      };
    }

    case REMOVE_PLAYER: {
      const remainingPlayers = state.players.filter(
        (player) => player.id !== action.payload.id
      );
      return { 
        players: remainingPlayers, 
        filteredPlayers: remainingPlayers 
      };
    }

    case UPDATE_PLAYER: {
      const updatedPlayers = state.players.map(player =>
        player.id === action.payload.id ? action.payload : player
      );
      return { 
        players: updatedPlayers, 
        filteredPlayers: updatedPlayers 
      };
    }

    default:
      return state;
  }
};

export default playersReducer;
