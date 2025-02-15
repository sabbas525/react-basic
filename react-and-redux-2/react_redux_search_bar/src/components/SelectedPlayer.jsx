import { useSelector } from "react-redux";

export const SelectedPlayer = () => {
  const selectedPlayer = useSelector((state) => state.selectedPlayer);

  if (!selectedPlayer || !selectedPlayer.id) {
    return null; // Don't render if no player is selected
  }

  return (
    <div id="selected-player">
      <h3>Selected Player</h3>
      <p id="player-name">{selectedPlayer.name}</p>
      <p id="player-status">
        {selectedPlayer.isActive ? "active" : "inactive"}
      </p>
    </div>
  );
};
