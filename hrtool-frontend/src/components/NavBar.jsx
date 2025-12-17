import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import icon from '../assets/icon.png';

const NavBar = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        sx={{
                            height: 45,  // Adjusts the size of the icon
                            mr: 1.5        // Adds margin-right (space) between icon and text
                        }}
                        alt="Logo"
                        src={icon}
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        HR Tool
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit" component={RouterLink} to="/">Departments</Button>
                        <Button color="inherit" component={RouterLink} to="/search">Search</Button>
                        <Button color="inherit" component={RouterLink} to="/promote">Promote</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;