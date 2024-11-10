import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://dummyapi.online/api/movies').then((res) => {
            setData(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }} style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%', backgroundColor: '#f0f8ff', padding: '2%', borderRadius: '8px' }}>
            <Grid container spacing={2}>
                {data.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card sx={{ minWidth: 275, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                            <CardContent>
                                <Typography variant="h5" component="div" style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                    {item.movie}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Rating: {item.rating}
                                </Typography>
                                <Typography variant="body2" style={{ color: '#7f8c8d' }}>
                                    ID: {item.id}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="contained" color="success">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
