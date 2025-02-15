/** @format
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Add authentication to the app.
 * 
 * Backend is still using Basic Auth.
 * 
 * REMEMBER: use the correct ids, classes and attributes in the exercise in the correct places to pass the tests. Remember to pass in the appropriate props to the child components. 

 * BEWARE: the tests will not pass if you use the wrong props.
 */
import { useState, useEffect } from "react";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { AddPlayer } from "./components/AddPlayer.jsx";
import { AuthUser } from "./components/AuthUser.jsx";

function App() {
  const [status, setStatus] = useState(REQ_STATUS.loading);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchPlayers();
    } else {
      setPlayers([]);
      setSelectedPlayer(null);
      setStatus(REQ_STATUS.success);
    }
  }, [isLoggedIn]);

  const fetchPlayers = async () => {
    setStatus(REQ_STATUS.loading);
    try {
      const response = await fetch("http://localhost:3001/api/players", {
        headers: {
          'Authorization': `Basic ${authToken}`
        }
      });
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
      const response = await fetch(`http://localhost:3001/api/players/${id}`, {
        headers: {
          'Authorization': `Basic ${authToken}`
        }
      });
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
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${authToken}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete player');
      setPlayers(prevPlayers => prevPlayers.filter(p => p.id !== id));
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
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authToken}`
        },
        body: JSON.stringify({ name })
      });
      if (!response.ok) throw new Error('Failed to add player');
      const newPlayer = await response.json();
      setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
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
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authToken}`
        },
        body: JSON.stringify({ ...selectedPlayer, isActive })
      });
      if (!response.ok) throw new Error('Failed to update player');
      const updatedPlayer = await response.json();
      setSelectedPlayer(updatedPlayer);
      setPlayers(prevPlayers => prevPlayers.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
      setStatus(REQ_STATUS.success);
    } catch (error) {
      setStatus(REQ_STATUS.error);
    }
  };

  const handleLogin = (username, password) => {
    setStatus(REQ_STATUS.loading);
    try {
      const token = btoa(`${username}:${password}`);
      setAuthToken(token);
      setIsLoggedIn(true);
      setStatus(REQ_STATUS.success);
    } catch (error) {
      setStatus(REQ_STATUS.error);
    }
  };

  const handleRegister = async (username, password) => {
    setStatus(REQ_STATUS.loading);
    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }

      await response.json();
      
      // Log in after successful registration
      handleLogin(username, password);

    } catch (error) {
      setStatus(REQ_STATUS.error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    setPlayers([]);
    setSelectedPlayer(null);
    setStatus(REQ_STATUS.success);
  };

  return (
    <div>
      <RequestStatus>{status}</RequestStatus>
      
      <AuthUser 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />
      
      {isLoggedIn && (
        <>
          <AddPlayer handleSubmit={handleAddPlayer} />
          <ListPlayers 
            players={players} 
            selectPlayer={selectPlayer} 
          />
          
          {selectedPlayer && (
            <SelectedPlayer 
              player={selectedPlayer}
              handleDelete={handleDeletePlayer}
              handleUpdate={handleUpdatePlayer}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;