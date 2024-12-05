import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig'; 
import { Spa } from '@mui/icons-material';

export default function EntryPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); 
    } else {
      setUser(null); 
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogoutClick = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out successfully');
        setUser(null); 
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error logging out: ', error.message);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(120deg, #C6D8FE, #8E9EAB)',
        padding: 2,
      }}
    >
      <Container
        sx={{
            width:"50%",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent:'space-around',
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: 4,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to Our App!
        </Typography>
        <Typography variant="h6" sx={{ color: '#555', mb: 3, textAlign: 'center' }}>
          Your gateway to a seamless and user-friendly experience.
        </Typography>
        
        {!user ? (
          
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{display:'flex',justifyContent:"space-around"}}>
            <Button
              variant="contained"
              color="primary"
              sx={{  padding: '10px', fontWeight: 'bold',width:"25%" }}
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ padding: '10px', fontWeight: 'bold' ,width:"25%"}}
              onClick={handleSignupClick}
            >
              Sign Up
            </Button>
            </Box>
          </Box>
        ) : (
          
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
            <Typography variant="h6" sx={{ color: '#555', mb: 3, textAlign: 'center' }}>
              Welcome, {user.displayName || user.email}!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ padding: '10px', fontWeight: 'bold' }}
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

