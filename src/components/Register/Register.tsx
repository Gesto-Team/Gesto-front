import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { register } from "../../services/auth.services";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
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
            name="username"
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={formData.password}
            name="password"
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
    </Container>
  );
};

export default RegisterPage;
