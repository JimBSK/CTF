import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Главная</Link>
      <Link to="/tasks">Задачи</Link>
      <Link to="/rating">Рейтинг</Link>
      <Link to="/login">Вход</Link>
    </nav>
  );
}