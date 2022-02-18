import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, IconButton } from '@mui/material';
import {
    PageTypography,
    AppBarStyled,
    ContainerStyled,
    ToolbarStyled,
    AccountIcon,
    SystemText,
    RightBox,
    LayoutIcon,
    LogoBox,
    FingerPrintIcon
} from './styles';

const mockSystemId = 'FreePass - 001';
const mockCurrentPage = 'Dashboard';

const TopBar = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBarStyled position="static">
            <ContainerStyled maxWidth={false} disableGutters>
                <ToolbarStyled disableGutters>
                    <Tooltip title="Open/close menu">
                        <LogoBox>
                            <IconButton onClick={(event) => event.preventDefault()} sx={{ p: 0 }}>
                                <FingerPrintIcon light="true" />
                            </IconButton>
                        </LogoBox>
                    </Tooltip>
                    <PageTypography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, ml: 2, display: { xs: 'none', md: 'flex' } }}>
                        {mockCurrentPage}
                    </PageTypography>
                    <RightBox sx={{ flexGrow: 0 }}>
                        <Tooltip title="See your system specs">
                            <SystemText
                                variant="h6"
                                component="div"
                                sx={{ mr: 6, display: { xs: 'none', md: 'flex' } }}
                                onClick={() => navigate('/specs')}>
                                {mockSystemId}
                            </SystemText>
                        </Tooltip>
                        <Tooltip title="Change Layout">
                            <IconButton onClick={() => console.log('LayoutChanged')} sx={{ p: 0, mr: 6 }}>
                                <LayoutIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Open settings">
                            <IconButton onClick={() => navigate('/profile')} sx={{ p: 0, mr: 10 }}>
                                <AccountIcon />
                            </IconButton>
                        </Tooltip>
                    </RightBox>
                </ToolbarStyled>
            </ContainerStyled>
        </AppBarStyled>
    );
};

export default TopBar;
