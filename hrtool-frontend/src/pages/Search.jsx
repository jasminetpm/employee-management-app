import { useState } from 'react';
import { getEmployeeById } from '../services/api';
import {
    Container, TextField, Button, Card, CardContent,
    Typography, Box, Grid, Alert, Divider, Chip
} from '@mui/material';

const Search = () => {
    const [id, setId] = useState('');
    const [emp, setEmp] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setEmp(null);
        try {
            const res = await getEmployeeById(id);
            setEmp(res.data);
        } catch (err) {
            setError('Employee not found or server error');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Find Employee</Typography>

            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <TextField
                    label="Employee ID"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <Button variant="contained" size="large" type="submit">Search</Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {emp && (
                <Card elevation={4}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" color="primary">
                                    {emp.first_name} {emp.last_name}
                                </Typography>
                                <Typography color="text.secondary">ID: {emp.emp_no}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle2">Hire Date</Typography>
                                <Typography variant="body1">{emp.hire_date}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">Gender</Typography>
                                <Chip label={emp.gender} size="small" />
                            </Grid>

                            <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>Recent Titles</Typography>
                                {emp.titles?.slice().reverse().map((t, i) => (
                                    <Typography key={i} variant="body2">
                                        • <strong>{t.title}</strong> ({t.from_date} to {t.to_date})
                                    </Typography>
                                ))}
                            </Grid>

                            <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>Recent Salaries</Typography>
                                {emp.salaries?.slice().reverse().slice(0, 3).map((s, i) => (
                                    <Typography key={i} variant="body2">
                                        • ${s.salary.toLocaleString()} ({s.from_date})
                                    </Typography>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};
export default Search;