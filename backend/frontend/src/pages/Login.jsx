// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Теперь деструктуризация будет работать

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь должна быть логика авторизации
    login({ username }); // Пример входа
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Вход в систему</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Логин"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}