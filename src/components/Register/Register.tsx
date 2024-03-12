import React, { useState } from 'react';
import './Register.scss';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';

const RegisterPage: React.FC = () => {
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
      const response = await axios.post('http://localhost:3000/auth/register', formData);
      const token = response.data.access_token;
      setAccessToken(token);
      console.log(token);
      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
    }
  };

  const handleLogout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  };

  const fetchData = async () => {
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

  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h4" gutterBottom>
          Inscription
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            value={formData.username}
            name='username'
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={formData.password}
            name='password'
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            S'inscrire
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

export default RegisterPage;

