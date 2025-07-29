import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Card, CardContent, Typography, Grid, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/cars')
            .then(res => {
                setCars(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress sx={{ m: 4 }} />;

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {cars.map(car => (
                <Grid item xs={12} sm={6} md={4} key={car._id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{car.make} {car.model}</Typography>
                            <Typography>Year: {car.year}</Typography>
                            <Typography>Price/Day: ${car.pricePerDay}</Typography>
                            <Typography>Available: {car.available ? 'Yes' : 'No'}</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={() => navigate('/book')}
                                disabled={!car.available}
                            >
                                Book
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Cars; 