import { Icon, IconButton } from '@mui/material';
import React from 'react';
import { Circle, RightBox } from '../Login/styles';
import FaceScan from '../../assets/face-scan.svg';
import { useNavigate } from 'react-router-dom';

const MetricAccess = ({ isLight, ProvidedIcon, to, state }) => {
    const navigate = useNavigate();
    return (
        <RightBox isLight={isLight}>
            <IconButton onClick={() => navigate(to, { state })}>
                <Circle isLight={isLight}>
                    {ProvidedIcon ? (
                        <ProvidedIcon sx={{ fontSize: 'clamp(75px, 7vw, 150px)' }} />
                    ) : (
                        <Icon
                            sx={{
                                fontSize: 'clamp(75px, 7vw, 150px)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            component="div">
                            <img src={FaceScan} height="90%" width="90%"></img>
                        </Icon>
                    )}
                </Circle>
            </IconButton>
        </RightBox>
    );
};

export default MetricAccess;
