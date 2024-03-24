import React, { useState } from 'react';
import './Login.scss';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      const token = response.data.access_token;
      setAccessToken(token);
      console.log(token);
      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
    }
  };

  const fetchData = async () => {
    console.log(accessToken)
    try {
      const response = await axios.get('http://localhost:3000/auth/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Données récupérées:', response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleLogout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  };


  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h4" gutterBottom>
          Connexion
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            name='username'
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Mot de passe"
            type="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Se connecter
          </Button>
        </form>
      </div>

      <div>
      {accessToken ? (
        <div>
          <p>Connecté!</p>
          <button onClick={handleLogout}>Se déconnecter</button>
          <button onClick={fetchData}>Récupérer les données</button>
        </div>
      ) : (
        <div>
          <p>Non connecté</p>
        </div>
      )}
    </div>
    </Container>
  );
};

export default LoginPage;

