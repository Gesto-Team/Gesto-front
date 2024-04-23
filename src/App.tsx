import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import DashboardPage from './components/DashboardPage/DashboardPage';
import { useNavigate } from 'react-router-dom';
import axiosApiInstance from './AxiosConfig';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const fetchData = async () => {
  const userID = localStorage.getItem('userID');
  try {
    const response = await axiosApiInstance.get('http://localhost:3000/users/' + userID);
    console.log('Données récupérées:', response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
};

fetchData();

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
  localStorage.removeItem('userID');
  localStorage.removeItem('accessToken');
  window.location.href = '/login';
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
