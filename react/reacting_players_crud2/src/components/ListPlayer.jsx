/** @format
 *
 * Shoer instructions
 * ------------------     
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
export const ListPlayer = ({ player, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(player.id);
  };

  return (
    <li id={`player-${player.id}`}>
      <a href="#" onClick={handleClick}>
        {player.name}
      </a>
    </li>
  );
};
