/** @format
 *
 * Short instructions
 * ------------------
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
import { ListPlayer } from './ListPlayer';

export const ListPlayers = ({ players = [], selectPlayer }) => {
  // Ensure players is always an array
  const playersList = Array.isArray(players) ? players : [];
  
  return (
    <ul id="players-list">
      {playersList.map(player => (
        <ListPlayer 
          key={player.id} 
          player={player} 
          onClick={selectPlayer}
        />
      ))}
    </ul>
  );
};



