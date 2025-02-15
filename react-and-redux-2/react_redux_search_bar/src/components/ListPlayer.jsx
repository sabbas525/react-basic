import React from "react";

export const ListPlayer = ({ player, id, name, onClick }) => {
  // Handle both prop structures (object or individual props)
  const playerId = player ? player.id : id;
  const playerName = player ? player.name : name;

  return (
    <li id={`player-${playerId}`} role="listitem">
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          onClick(playerId);
        }}
        role="link"
        tabIndex="0"
        style={{ cursor: "pointer" }}
      >
        {playerName}
      </a>
    </li>
  );
};

export default ListPlayer;
