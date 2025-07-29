import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { Box, Typography, TextField, Button, MenuItem, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
    const [cars, setCars] = useState([]);
    const [car, setCar] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/cars').then(res => setCars(res.data.filter(c => c.available)));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await API.post('/bookings', { car, startDate, endDate, totalPrice });
            navigate('/bookings');
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
            <Typography variant="h4" gutterBottom>Book a Car</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    select
                    label="Car"
                    value={car}
                    onChange={e => setCar(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                >
                    {cars.map(c => (
                        <MenuItem key={c._id} value={c._id}>{c.make} {c.model}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Total Price"
                    type="number"
                    value={totalPrice}
                    onChange={e => setTotalPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Book
                </Button>
            </form>
        </Box>
    );
};

export default BookingForm; 