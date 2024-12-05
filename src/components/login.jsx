import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);
            // Redirect user after successful login
            navigate('/');
        } catch (error) {
            console.error("Error logging in:", error.message);
            if (error.code === 'auth/wrong-password') {
                setSnackbarMessage("Incorrect password. Please try again.");
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            } else {
                setSnackbarMessage("Login failed. Please check your credentials.");
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    const validateInputs = () => {
        if (!email || !password) {
            setSnackbarMessage("Both fields are required.");
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return false;
        }
        return true;
    };

    function handleClick(e) {
        e.preventDefault();
        if (validateInputs()) {
            login(email, password);
        }
    }

    const BoxStyle = {
        padding: '30px',
        width: { xs: '90%', sm: '70%', md: '40%' }, // Responsive width
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #ffffff, #C6D8FE)',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(120deg, #C6D8FE, #8E9EAB)',
                padding: '20px',
            }}
        >
            <Box sx={BoxStyle}>
                <Typography variant="h3" sx={{ fontWeight: '900', mb: 2 }}>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    onChange={(event) => { setEmail(event.target.value) }}
                    fullWidth
                    required
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976D2',
                        },
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(event) => { setPassword(event.target.value) }}
                    sx={{ mb: 2 }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        mb: 2,
                    }}
                >
                    <Typography sx={{ fontSize: '0.9rem', color: '#555' }}>
                        <label>
                            <input type="checkbox" style={{ marginRight: '5px' }} /> Remember Me
                        </label>
                    </Typography>
                    <Button
                        variant="text"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            color: '#1976D2',
                        }}
                    >
                        Forgot Password?
                    </Button>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        padding: '10px 0',
                        transition: 'all 0.3s ease',
                        '&:hover': { backgroundColor: '#145DA0' },
                    }}
                    onClick={(e) => handleClick(e)}
                >
                    Login
                </Button>
                <Typography
                    sx={{
                        fontSize: '0.9rem',
                        color: '#555',
                        textAlign: 'center',
                    }}
                >
                    Don&apos;t have an account?{' '}
                    <Button
                        variant="text"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1976D2',
                            textTransform: 'none',
                            padding: 0,
                        }}
                        onClick={() => { navigate('/signup') }}
                    >
                        Sign Up
                    </Button>
                </Typography>
            </Box>

            {/* Snackbar for notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
