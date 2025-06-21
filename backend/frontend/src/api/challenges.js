export default {
    submitFlag: async (challengeId, flag, token) => {
      const response = await fetch(`/api/challenges/${challengeId}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ flag })
      });
      return await response.json();
    }
  };