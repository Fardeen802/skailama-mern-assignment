import React, { useState } from 'react';
import { signup } from '../controller/registerController';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import QuesLogo from '../assets/QuesLogo.svg';
import logo from '../assets/logo.svg';
import Maskgroup from '../assets/Maskgroup.svg';
import '@fontsource/poppins';

const SignUpPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signup(form);
      setMessage('Signup successful!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setMessage(error.message || 'Signup failed.');
    }
  };

  return (
    <Box sx={{ height: "100vh", overflowX: 'hidden', display: "flex" }}>
      {/* Left side */}
      <Box
        sx={{
          flex: "0 0 60%",
          height: '100vh',
          backgroundColor: '#3A0B63',
          backgroundImage: `url(${Maskgroup})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          backgroundSize: "contain",
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            p: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <img
            src={QuesLogo}
            alt="Ques.ai"
            style={{ width: '200px', marginBottom: '3rem' }}
          />
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              whiteSpace: 'pre-line',
              fontWeight: 400,
              maxWidth: '400px',
              lineHeight: 1.2,
              textAlign: 'left',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '2rem',
            }}
          >
            Your podcast{"\n"}will no longer{"\n"}be just a hobby.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              whiteSpace: 'pre-line',
              fontWeight: 460,
              maxWidth: '400px',
              lineHeight: 1.2,
              textAlign: 'left',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Supercharge Your Distribution{"\n"}using our AI assistant!
          </Typography>
        </Box>
      </Box>

      {/* Right side */}
      <Box
        sx={{
          flex: "0 0 40%",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          {/* Logo and Welcome text */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <img
              src={logo}
              alt="Ques.ai"
              style={{ width: '100px', marginBottom: '1rem' }}
            />
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 300,
                fontSize: '30px',
                color: '#7E22CE',
                textAlign: 'center',
                whiteSpace: 'pre-line',  
              }}
            >
              Create an account on{"\n"}
              <Box component="span" sx={{ fontWeight: 700 }}>
                Ques.AI
              </Box>
            </Typography>
          </Box>

          {/* Signup form */}
          <Paper elevation={0} sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={form.name}
                onChange={handleChange}
              />

              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={handleChange}
              />

              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  backgroundColor: '#7E22CE',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#6b1fb8',
                  },
                }}
              >
                Sign Up
              </Button>
            </form>
            {message && (
              <Typography
                sx={{ mt: 2, color: message.includes('successful') ? 'green' : 'red' }}
              >
                {message}
              </Typography>
            )}
          </Paper>
          <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
              Have an account already?{' '}
              <Box
                component="span"
                sx={{ color: '#7E22CE', cursor: 'pointer', fontWeight: 500 }}
                onClick={() => navigate('/login')}
              >
                login
              </Box>
  </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
