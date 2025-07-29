import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        API.get('/auth/profile')
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load profile');
                setLoading(false);
            });
    }, []);

    if (loading) return <CircularProgress sx={{ m: 4 }} />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
            <Typography variant="h4" gutterBottom>Profile</Typography>
            <Typography>Name: {user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Admin: {user.isAdmin ? 'Yes' : 'No'}</Typography>
        </Box>
    );
};

export default Profile; 