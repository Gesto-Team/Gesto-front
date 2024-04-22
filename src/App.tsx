import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import DashboardPage from './components/DashboardPage/DashboardPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const axiosApiInstance = axios.create();

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  console.log(originalRequest);
  // if (error.response.status === 401 && !originalRequest._retry ) {
  //   originalRequest._retry = true;
  //   const access_token = await axiosApiInstance.get('http://localhost:3000/auth/refresh');  
  //   console.log(access_token, 'testtesttetst');
  //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
  //   return axiosApiInstance(originalRequest);
  // }
  return Promise.reject(error);
});

const fetchData = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axiosApiInstance.get('http://localhost:3000/auth/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
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
