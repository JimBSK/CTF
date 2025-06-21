// frontend/src/App.js
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes'; // Импортируем default export
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
     <AuthProvider>
      <Router>
      <Navbar />
      <AppRoutes />
    </Router>
     </AuthProvider>
  );
}

export default App;