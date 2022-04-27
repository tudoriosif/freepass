import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import TopBar from '../components/NavBar/TopBar';
import SideBar from '../components/NavBar/SideBar';

const NavLayout = () => {
    return (
        <Container maxWidth={false} disableGutters sx={{ maxHeight: '100vh' }}>
            <TopBar />
            <Container maxWidth={false} disableGutters sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
                <SideBar />
                <div className="flex-child" style={{ paddingTop: '25px' }}>
                    <Outlet />
                </div>
            </Container>
        </Container>
    );
};

export default NavLayout;
