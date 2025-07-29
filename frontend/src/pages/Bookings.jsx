import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Card, CardContent, Typography, Grid, CircularProgress, Alert } from '@mui/material';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        API.get('/bookings')
            .then(res => {
                setBookings(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load bookings');
                setLoading(false);
            });
    }, []);

    if (loading) return <CircularProgress sx={{ m: 4 }} />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {bookings.map(booking => (
                <Grid item xs={12} sm={6} md={4} key={booking._id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{booking.car?.make} {booking.car?.model}</Typography>
                            <Typography>From: {new Date(booking.startDate).toLocaleDateString()}</Typography>
                            <Typography>To: {new Date(booking.endDate).toLocaleDateString()}</Typography>
                            <Typography>Total Price: ${booking.totalPrice}</Typography>
                            <Typography>Status: {booking.status}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Bookings; 