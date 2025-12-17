import { useEffect, useState } from 'react';
import { getDepartments, getEmployeesByDept } from '../services/api';
import {
    Container, Grid, List, ListItemButton, ListItemText,
    Paper, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button, Box
} from '@mui/material';

const Home = () => {
    const [depts, setDepts] = useState([]);
    const [selectedDept, setSelectedDept] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getDepartments().then(res => setDepts(res.data));
    }, []);

    const handleDeptClick = (deptNo) => {
        setSelectedDept(deptNo);
        setPage(1);
        fetchEmployees(deptNo, 1);
    };

    const fetchEmployees = (deptNo, pageNo) => {
        getEmployeesByDept(deptNo, pageNo).then(res => setEmployees(res.data));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {/* Left Column: Department List */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Departments</Typography>
                        <List component="nav" sx={{ maxHeight: 500, overflow: 'auto' }}>
                            {depts.map(d => (
                                <ListItemButton
                                    key={d.dept_no}
                                    selected={selectedDept === d.dept_no}
                                    onClick={() => handleDeptClick(d.dept_no)}
                                >
                                    <ListItemText primary={d.dept_name} secondary={d.dept_no} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Right Column: Employee Table */}
                <Grid item xs={12} md={8}>
                    {selectedDept ? (
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Employees in {selectedDept}
                            </Typography>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>ID</strong></TableCell>
                                            <TableCell><strong>First Name</strong></TableCell>
                                            <TableCell><strong>Last Name</strong></TableCell>
                                            <TableCell><strong>Hire Date</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {employees.map(e => (
                                            <TableRow key={e.emp_no}>
                                                <TableCell>{e.emp_no}</TableCell>
                                                <TableCell>{e.first_name}</TableCell>
                                                <TableCell>{e.last_name}</TableCell>
                                                <TableCell>{e.hire_date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    disabled={page === 1}
                                    onClick={() => {setPage(p => p-1); fetchEmployees(selectedDept, page-1)}}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => {setPage(p => p+1); fetchEmployees(selectedDept, page+1)}}
                                >
                                    Next
                                </Button>
                            </Box>
                        </Paper>
                    ) : (
                        <Paper sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                            <Typography variant="h6">Select a department to view employees</Typography>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
export default Home;