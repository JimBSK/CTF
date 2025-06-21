import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

function ChallengeList() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/challenges/')
      .then(response => setChallenges(response.data));
  }, []);

  return (
    <div>
      {challenges.map(challenge => (
        <Card key={challenge.id} sx={{ margin: 2 }}>
          <CardContent>
            <Typography variant="h5">{challenge.title}</Typography>
            <Typography>Points: {challenge.points}</Typography>
            <Typography>{challenge.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ChallengeList;
function ChallengeCard({ challenge }) {
    const [flag, setFlag] = useState('');
    const [message, setMessage] = useState('');
  
    const submitFlag = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.post(
          'http://localhost:8000/api/submit/',
          { challenge_id: challenge.id, flag },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage(response.data.is_correct ? '✅ Correct flag!' : '❌ Wrong flag!');
      } catch (error) {
        setMessage('⚠️ Error submitting flag');
      }
    };
  
    return (
      <div className="challenge-card">
        <h3>{challenge.title} ({challenge.points} pts)</h3>
        <p>{challenge.description}</p>
        {challenge.is_solved ? (
          <p className="solved-badge">Solved!</p>
        ) : (
          <>
            <input
              type="text"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              placeholder="Enter flag"
            />
            <button onClick={submitFlag}>Submit</button>
          </>
        )}
        {message && <p>{message}</p>}
      </div>
    );
  }