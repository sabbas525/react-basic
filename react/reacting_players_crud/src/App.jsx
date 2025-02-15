/** @format
 *
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Create a new player in the backend when the user submits the form in the AddPlayer component.
 *
 * Likewise, add logic to update the player in the backend when the user clicks the update button in the SelectedPlayer component.
 *
 * Finally, add logic to delete the player in the backend when the user clicks the delete button in the SelectedPlayer component.
 * 
 * HINT: Before the above logic, it may be better to start by updating the SelectedPlayer component to use the new props.
 * 
 * REMEMBER: use the right ids, classes and attributes in the exercise to pass the tests. Remember to pass in the appropriate props to the child components.

* BEWARE: the tests will not pass if you use the wrong props. Look at invididual component file descriptions and tests to see what props are expected.
*
*/
import { useState, useEffect } from "react";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { AddPlayer } from "./components/AddPlayer.jsx";

function App() {
const [status, setStatus] = useState(REQ_STATUS.loading);
const [players, setPlayers] = useState([]);
const [selectedPlayer, setSelectedPlayer] = useState(null);

useEffect(() => {
fetchPlayers();
}, []);

const fetchPlayers = async () => {
setStatus(REQ_STATUS.loading);
try {
    const response = await fetch("http://localhost:3001/api/players");
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    setPlayers(data);
    setStatus(REQ_STATUS.success);
} catch (error) {
    setStatus(REQ_STATUS.error);
}
};

const selectPlayer = async (id) => {
setStatus(REQ_STATUS.loading);
try {
    const response = await fetch(`http://localhost:3001/api/players/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    setSelectedPlayer(data);
    setStatus(REQ_STATUS.success);
} catch (error) {
    setStatus(REQ_STATUS.error);
}
};


const handleDeletePlayer = async (id) => {
setStatus(REQ_STATUS.loading);
try {
const response = await fetch(`http://localhost:3001/api/players/${id}`, {
    method: 'DELETE'
});
if (!response.ok) throw new Error('Failed to delete player');

// Update local state immediately
setPlayers(players.filter(p => p.id !== id));
setSelectedPlayer(null);
setStatus(REQ_STATUS.success);
} catch (error) {
setStatus(REQ_STATUS.error);
}
};


const handleAddPlayer = async (name) => {
setStatus(REQ_STATUS.loading);
try {
const response = await fetch("http://localhost:3001/api/players", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
});
if (!response.ok) throw new Error('Failed to add player');
const newPlayer = await response.json();
// Update local state immediately
setPlayers([...players, newPlayer]);
setStatus(REQ_STATUS.success);
} catch (error) {
setStatus(REQ_STATUS.error);
}
};

const handleUpdatePlayer = async (isActive) => {
if (!selectedPlayer) return;

setStatus(REQ_STATUS.loading);
try {
    const response = await fetch(`http://localhost:3001/api/players/${selectedPlayer.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...selectedPlayer, isActive })
    });
    if (!response.ok) throw new Error('Failed to update player');
    const updatedPlayer = await response.json();
    setSelectedPlayer(updatedPlayer);
    await fetchPlayers();
    setStatus(REQ_STATUS.success);
} catch (error) {
    setStatus(REQ_STATUS.error);
}
};

return (
<div>
    <RequestStatus>{status}</RequestStatus>
    <AddPlayer handleSubmit={handleAddPlayer} />
    <ListPlayers 
    players={players} 
    selectPlayer={selectPlayer} 
    />
    <SelectedPlayer 
    player={selectedPlayer}
    handleDelete={handleDeletePlayer}
    handleUpdate={handleUpdatePlayer}
    />
</div>
);
}

export default App;
