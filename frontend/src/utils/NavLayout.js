import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import TopBar from '../components/NavBar/TopBar';
import SideBar from '../components/NavBar/SideBar';

const NavLayout = () => {
    return (
        <Container maxWidth={false} disableGutters>
            <TopBar />
            <Container maxWidth={false} disableGutters sx={{ display: 'flex' }}>
                <SideBar />
                <div className="flex-child">
                    <Outlet />
                </div>
            </Container>
        </Container>
    );
};

export default NavLayout;
