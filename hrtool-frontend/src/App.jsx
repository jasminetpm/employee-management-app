// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Promote from './pages/Promote';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Create your custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#131213', // Main brand color
        },
        secondary: {
            main: '#9D6777', // Accent color
        },
    },

    typography: {
        fontFamily: [
            'Inter',
            'Arial', //fallback
            'sans-serif', //fallback
        ].join(','),
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}> {/* Wrap everything in ThemeProvider */}
            <BrowserRouter>
                <CssBaseline />  {/* Normalizes CSS across browsers */}
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/promote" element={<Promote />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;