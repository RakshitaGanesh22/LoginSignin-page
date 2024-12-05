import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore
import { auth } from "./firebaseConfig";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // State for confirm password visibility
    const [openSnackbar, setOpenSnackbar] = useState(false);  // Snackbar open state
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');  // Can be 'error' or 'success'
    const navigate = useNavigate();

    const signup = async (email, password, username) => {
        try {
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setOpenSnackbar(true);
            alert(`Account got created successfully`)
            setSnackbarMessage('Account created successfully!');
            setSnackbarSeverity('success');
            navigate('/login');
            console.log("User registered:", userCredential.user);
            
            
            const db = getFirestore();
            await setDoc(doc(db, "users", userCredential.user.uid), {
                username: username,
                email: email,
            });
            console.log("Username saved to Firestore");

            
            
        } catch (error) {
            console.error("Error signing up:", error.message);
            setSnackbarMessage('Error signing up: ' + error.message);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const BoxStyle = {
        padding: '30px',
        width: { xs: '90%', sm: '70%', md: '40%' },
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

    const handleClick = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (username.length < 4) {
            setSnackbarMessage('Username must be at least 4 characters long');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        } else if (!emailRegex.test(email)) {
            setSnackbarMessage('Invalid email address');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        } else if (!passwordRegex.test(password)) {
            setSnackbarMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        } else if (password !== confirmPassword) {
            setSnackbarMessage('Passwords do not match');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        } else {
            signup(email, password, username);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                background: 'linear-gradient(120deg, #C6D8FE, #8E9EAB)',
                padding: '15px',
            }}
        >
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '40%',
                    textAlign: 'center',
                    color: '#fff',
                }}
            >
                <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Join Us Today!
                </Typography>
                <Typography sx={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                    By creating an account, you'll gain access to exclusive features, personalized
                    experiences, and much more. Don't miss out—sign up now!
                </Typography>
            </Box>

            <Box sx={BoxStyle}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: '900', mb: 2 }}
                >
                    Sign Up
                </Typography>
                <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => { setUsername(event.target.value) }}
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => { setEmail(event.target.value) }}
                    required
                />
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}  // Toggle visibility
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => { setPassword(event.target.value) }}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"} 
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => { setConfirmPassword(event.target.value) }}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
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
                    Create Account
                </Button>
                <Typography sx={{ fontSize: '0.9rem', color: '#555', textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Button
                        variant="text"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1976D2',
                            textTransform: 'none',
                            padding: 0,
                        }}
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </Button>
                </Typography>
            </Box>

            {/* Snackbar for validation messages */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
