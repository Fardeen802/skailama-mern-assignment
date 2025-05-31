import React, { useState } from "react";
import "./LoginPage.css";
import { login ,signup } from "../controller/registerController";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import QuesLogo from '../assets/QuesLogo.svg';
import logo from '../assets/logo.svg';
import Maskgroup from '../assets/Maskgroup.svg';
import google from '../assets/google.png'
import '@fontsource/poppins';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
 
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async () => {
    try {
      const response = await login({email,password});
      console.log(response);

      if (response?.data?.message === 'Login successful') {
        window.location.href = '/dashboard';
      }
      // alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      // alert('Login failed!');
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
  {/* Absolute positioned container */}
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
    {/* Logo */}
    <img
      src={QuesLogo}
      alt="Ques.ai"
      style={{ width: '200px', marginBottom: '3rem' }}
    />

    {/* Text aligned with logo */}
    <Typography
  variant="h3"
  sx={{
    color: '#fff',
    whiteSpace: 'pre-line',
    fontWeight: 400,
    maxWidth: '400px',
    lineHeight: 1.2,
    textAlign: 'left', 
    display: 'block',  
    fontFamily: 'Poppins, sans-serif',
    marginBottom:'2rem'
  }}
>
  Your podcast{"\n"}
  will no longer{"\n"}
  be just a hobby.
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
    display: 'block',  
    fontFamily: 'Poppins, sans-serif',
  }}
>
Supercharge Your Distribution{"\n"} using our AI assistant!
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
    boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
    p: 4,
  }}
>
  <Box sx={{ width: '100%', maxWidth: 400,justifyContent:'center' }}>
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
          fontSize: '1.25rem',
          whiteSpace: 'pre-line',
          color:'#7E22CE',
          fontSize:'30px'
        }}
      >
        Welcome to{"\n"}<Box component="span" sx={{ fontWeight: 700 }}>
    Ques.AI
  </Box>
      </Typography>
    </Box>

    {/* Login form */}
    <Paper elevation={0} sx={{ width: '100%' }}>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
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
        onChange={(e) => setPassword(e.target.value)}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
        }}
      >
        <FormControlLabel control={<Checkbox />} label="Remember Me" />
        <Typography
          variant="body2"
          sx={{ cursor: 'pointer', color: '#7E22CE' }}
          onClick={() => console.log('Hi from forgot')}
        >
          Forgot password?
        </Typography>
      </Box>

      <Button
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
        onClick={handleLogin}
      >
        Login
      </Button>
    </Paper>
    <Box sx={{ textAlign: 'center', mt: 3 }}>
  <Typography
    sx={{
      color: '#999',
      fontSize: '14px',
      mb: 2,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '45%',
        height: '1px',
        backgroundColor: '#ccc',
        top: '50%',
        left: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '45%',
        height: '1px',
        backgroundColor: '#ccc',
        top: '50%',
        right: 0,
      },
    }}
  >
    or
  </Typography>

  <Button
    variant="outlined"
    fullWidth
    sx={{
      textTransform: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      borderColor: '#ddd',
      color: '#444',
      fontWeight: 500,
      fontFamily: 'Poppins, sans-serif',
      mb: 2,
    }}
    onClick={() => console.log('Continue with Google')}
  >
    <img
      src={google}
      alt="Google"
      style={{ width: 20, height: 20 }}
    />
    Continue with Google
  </Button>

  <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
    Don’t have an account?{' '}
    <Box
      component="span"
      sx={{ color: '#7E22CE', cursor: 'pointer', fontWeight: 500 }}
      onClick={() => navigate('/signup')}
    >
      Create one
    </Box>
  </Typography>
</Box>

  </Box>
</Box>

    </Box>
  );
};

export default LoginPage;
