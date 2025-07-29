import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={Link} to="/">Go-Rent</Button>
                        <Button color="inherit" component={Link} to="/cars">Cars</Button>
                        {isLoggedIn && <Button color="inherit" component={Link} to="/bookings">Bookings</Button>}
                        {isLoggedIn && <Button color="inherit" component={Link} to="/profile">Profile</Button>}
                    </Typography>
                    {!isLoggedIn ? (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar; 