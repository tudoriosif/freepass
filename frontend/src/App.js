import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Multimodal from './pages/MultimodalAccess';
import theme from './constants/theme';
import { ThemeProvider } from '@mui/system';
import FingerprintScan from './pages/FingerprintScan';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <FingerprintScan />
            </div>
        </ThemeProvider>
    );
}

export default App;
