import { useEffect, useState } from 'react';

const Scoreboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://your-ctf-platform.com/scoreboard');

    ws.onopen = () => console.log('Connected to Scoreboard WS');
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setScores(data.sort((a, b) => b.score - a.score));
    };

    return () => ws.close();
  }, []);

  return (
    <div className="scoreboard">
      <h2>🏆 Топ игроков</h2>
      <table>
        <thead>
          <tr>
            <th>Игрок</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((user, index) => (
            <tr key={user.id} className={index < 3 ? 'top-three' : ''}>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Scoreboard; 