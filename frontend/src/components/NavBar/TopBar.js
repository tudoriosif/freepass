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
import { useDispatch } from 'react-redux';
import { switchNav } from '../../redux/slices/styleSlice';

const mockSystemId = 'FreePass - 001';

const TopBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <AppBarStyled position="static">
            <ContainerStyled maxWidth={false} disableGutters>
                <ToolbarStyled disableGutters>
                    <Tooltip title="Open/close menu">
                        <LogoBox>
                            <IconButton onClick={() => dispatch(switchNav())} sx={{ p: 0 }}>
                                <FingerPrintIcon light="true" />
                            </IconButton>
                        </LogoBox>
                    </Tooltip>
                    <PageTypography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, ml: 2, display: { xs: 'none', md: 'flex' } }}>
                        {window.location.pathname.slice(1).charAt(0).toUpperCase() + window.location.pathname.slice(2)}
                    </PageTypography>
                    <RightBox sx={{ flexGrow: 0 }}>
                        <Tooltip title="See your system specs">
                            <SystemText
                                variant="h6"
                                component="div"
                                sx={{ mr: 6, display: { xs: 'none', md: 'flex' } }}
                                onClick={() => navigate('/devices')}>
                                {mockSystemId}
                            </SystemText>
                        </Tooltip>
                        <Tooltip title="Change Layout">
                            <IconButton
                                onClick={() => console.log('LayoutChanged')}
                                sx={{ p: 0, mr: { xs: 4, md: 6 } }}>
                                <LayoutIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Open settings">
                            <IconButton onClick={() => navigate('/settings')} sx={{ p: 0, mr: { xs: 4, md: 10 } }}>
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
