// src/components/Challenge/FlagSubmit.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Используем useAuth вместо прямого доступа к контексту
import api from '../../api/challenges';

const FlagSubmit = ({ challengeId }) => {
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useAuth(); // Получаем user через хук

  const handleSubmit = async () => {
    try {
      const response = await api.submitFlag(challengeId, flag, user.token);
      setMessage(response.success ? '✅ Флаг принят!' : '❌ Неверный флаг');
    } catch (error) {
      setMessage('🚀 Ошибка отправки');
    }
  };

  return (
    <div className="flag-submit">
      <input
        value={flag}
        onChange={(e) => setFlag(e.target.value)}
        placeholder="Введите флаг"
      />
      <button onClick={handleSubmit}>Отправить</button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default FlagSubmit;