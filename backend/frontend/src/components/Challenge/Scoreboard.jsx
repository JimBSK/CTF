import { useEffect, useState } from 'react';

const Scoreboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://your-backend/scoreboard');
    ws.onmessage = (e) => setPlayers(JSON.parse(e.data));
    return () => ws.close();
  }, []);

  return (
    <table>
      {players.map(player => (
        <tr key={player.id}>
          <td>{player.name}</td>
          <td>{player.score}</td>
        </tr>
      ))}
    </table>
  );
};