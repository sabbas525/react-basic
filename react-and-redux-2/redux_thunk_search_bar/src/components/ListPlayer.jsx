import React from "react";
import { useDispatch } from "react-redux";
import { getSelectedPlayer } from "../redux/actionCreators/thunks/ListPlayer";

export const ListPlayer = ({ player, onClick, id, name }) => {
  const dispatch = useDispatch();
  // Build a player object if one wasn’t passed
  const actualPlayer = player || { id, name };

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(actualPlayer.id);
    } else {
      // If no onClick is provided, dispatch the thunk that gets the selected player.
      dispatch(getSelectedPlayer(actualPlayer.id));
    }
  };

  return (
    <li id={`player-${actualPlayer.id}`} role="listitem">
      <a
        href=""
        onClick={handleClick}
        role="link"
        tabIndex="0"
        style={{ cursor: "pointer" }}
      >
        {actualPlayer.name}
      </a>
    </li>
  );
};

export default ListPlayer;
