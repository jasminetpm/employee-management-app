import { useState } from 'react';
import { promoteEmployee } from '../services/api';
import {
    Container, TextField, Button, Checkbox,
    FormControlLabel, Typography, Paper, Alert, Box
} from '@mui/material';

const Promote = () => {
    const [formData, setFormData] = useState({
        emp_no: '', job_title: '', dept_no: '', salary: '', from_date: '', isManager: false
    });
    const [msg, setMsg] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg({ type: '', text: '' });
        try {
            await promoteEmployee(formData);
            setMsg({ type: 'success', text: 'Success: Employee Updated!' });
        } catch (err) {
            setMsg({ type: 'error', text: 'Error: ' + (err.response?.data || 'Update Failed') });
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>Promote / Transfer</Typography>

                {msg.text && <Alert severity={msg.type} sx={{ mb: 2 }}>{msg.text}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Employee ID" name="emp_no" required onChange={handleChange} />
                    <TextField label="New Job Title" name="job_title" required onChange={handleChange} />
                    <TextField label="Department ID (e.g. d001)" name="dept_no" required onChange={handleChange} />
                    <TextField label="New Salary" name="salary" type="number" required onChange={handleChange} />
                    <TextField
                        label="Effective Date"
                        name="from_date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        required
                        onChange={handleChange}
                    />

                    <FormControlLabel
                        control={<Checkbox name="isManager" onChange={handleChange} />}
                        label="Promote to Manager of this Department?"
                    />

                    <Button variant="contained" size="large" type="submit">
                        Submit Promotion
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};
export default Promote;