import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import theme from './constants/theme';
import { ThemeProvider } from '@mui/system';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <NavBar />
            </div>
        </ThemeProvider>
    );
}

export default App;
