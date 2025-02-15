/** @format
 *
  Short instructions
  ------------------

  This component is used to display the selected player. It receives a player as props.
  
  NOTE: For the ids, classes and html elements, refer to tests in the __tests__ folder to pass the unit tests, and to the cypress/e2e folder for the end-to-end tests.
 */
export const SelectedPlayer = ({ player }) => {
  if (!player) return null;

  return (
    <div id="selected-player">
      <div id="player-name">{player.name}</div>
      <div id="player-status">
        {player.isActive ? "active" : "inactive"}
      </div>
    </div>
  );
};


