import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Card, CardContent, Typography, Grid, Button, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert } from '@mui/material';

const Admin = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [editCar, setEditCar] = useState(null);
    const [form, setForm] = useState({ make: '', model: '', year: '', pricePerDay: '', available: true, image: '' });

    const fetchCars = () => {
        API.get('/cars')
            .then(res => {
                setCars(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load cars');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleOpen = (car = null) => {
        setEditCar(car);
        setForm(car ? { ...car } : { make: '', model: '', year: '', pricePerDay: '', available: true, image: '' });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditCar(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async () => {
        try {
            if (editCar) {
                await API.put(`/cars/${editCar._id}`, form);
            } else {
                await API.post('/cars', form);
            }
            fetchCars();
            handleClose();
        } catch (err) {
            setError('Failed to save car');
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/cars/${id}`);
            fetchCars();
        } catch (err) {
            setError('Failed to delete car');
        }
    };

    if (loading) return <CircularProgress sx={{ m: 4 }} />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ p: 2 }}>
            <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
                Add Car
            </Button>
            <Grid container spacing={2}>
                {cars.map(car => (
                    <Grid item xs={12} sm={6} md={4} key={car._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{car.make} {car.model}</Typography>
                                <Typography>Year: {car.year}</Typography>
                                <Typography>Price/Day: ${car.pricePerDay}</Typography>
                                <Typography>Available: {car.available ? 'Yes' : 'No'}</Typography>
                                <Button onClick={() => handleOpen(car)} sx={{ mt: 1 }}>Edit</Button>
                                <Button color="error" onClick={() => handleDelete(car._id)} sx={{ mt: 1, ml: 1 }}>Delete</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editCar ? 'Edit Car' : 'Add Car'}</DialogTitle>
                <DialogContent>
                    <TextField label="Make" name="make" value={form.make} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Model" name="model" value={form.model} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Year" name="year" value={form.year} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Price Per Day" name="pricePerDay" value={form.pricePerDay} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Image URL" name="image" value={form.image} onChange={handleChange} fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Admin; 