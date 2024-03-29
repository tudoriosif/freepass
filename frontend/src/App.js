import React from 'react';
import './App.css';
import Login from './pages/Login';
import Multimodal from './pages/MultimodalAccess';
import theme from './constants/theme';
import { ThemeProvider } from '@mui/system';
import FingerprintScan from './pages/FingerprintScan';
import FaceRecognition from './pages/FaceRecognition';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import NavLayout from './utils/NavLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Devices from './components/Devices/Devices';
import Roles from './components/Roles/Roles';
import Events from './components/Events/Events';
import Settings from './components/Settings/Settings';
import ProtectedRoute from './utils/ProtectedRoute';
import { ROLES } from './constants/constants';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/multimodal" element={<Multimodal />} />
                    <Route path="/face-recognition" element={<FaceRecognition />} />
                    <Route path="/fingerprint-scan" element={<FingerprintScan />} />
                    <Route element={<NavLayout />}>
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/settings" element={<Settings />} />
                        </Route>
                    </Route>
                    <Route element={<NavLayout />}>
                        <Route element={<ProtectedRoute roles={[ROLES.MAIN]} />}>
                            <Route path="/devices" element={<Devices />} />
                            <Route path="/roles" element={<Roles />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
