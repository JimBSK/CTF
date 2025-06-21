import { useAuth } from '../context/AuthContext'; // Используем useAuth
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Получаем user через хук
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;