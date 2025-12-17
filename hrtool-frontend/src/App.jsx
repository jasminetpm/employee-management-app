import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Promote from './pages/Promote';
import { CssBaseline } from '@mui/material';

function App() {
    return (
        <BrowserRouter>
            <CssBaseline /> {/* Normalizes CSS across browsers */}
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/promote" element={<Promote />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;