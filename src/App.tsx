import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import DashboardPage from './components/DashboardPage/DashboardPage';

const isAuthenticated = (): boolean => {
  // Vérifie si l'utilisateur est authentifié, par exemple en vérifiant la présence d'un jeton d'accès dans le localStorage
  const accessToken = localStorage.getItem('accessToken');
  return accessToken !== null;
};

const Navbar: React.FC<{ isLoggedIn: boolean; onLogout: () => void }> = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          {isAuthenticated() ? <button onClick={handleLogout}>Se déconnecter</button> : <Link to="/login">Connexion</Link>}
        </li>
      </ul>
    </nav>
  );
};

const handleLogout = () => {
  console.log('remove token');
  localStorage.removeItem('accessToken');
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isAuthenticated() ? true : false} onLogout={handleLogout} />
        <Routes>
            <Route
              path="/"
              element={
                isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" />
              }
            />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App
