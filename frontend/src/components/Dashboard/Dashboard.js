import { Badge, Card, CardContent, CardMedia, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransmission, closeTransmission } from '../../redux/slices/camSlice';

import { ContainerStyled, MiddleCardText } from './styles.js';

const webSocketCam = new WebSocket('ws://localhost:8000/stream_cam');
const webSocketPIR = new WebSocket('ws://localhost:8000/pir_sensor');

webSocketCam.onopen = () => {
    console.log('WSC Connected to server!');
};

webSocketCam.onclose = () => {
    console.log('WSC Closed Connection!');
};

webSocketCam.onmessage = (message) => {
    console.log(message);
};

webSocketPIR.onopen = () => {
    console.log('WSP Connected to server!');
};

webSocketPIR.onclose = () => {
    console.log('WSP Closed Connection!');
};

const Dashboard = () => {
    const dispatch = useDispatch();

    const message = useSelector((state) => state.cam.message);
    const error = useSelector((state) => state.cam.error);
    const loading = useSelector((state) => state.cam.loading);

    useEffect(() => {
        dispatch(createTransmission({ nodeNumber: 1 }));
    }, []);

    return (
        <ContainerStyled maxWidth={false} disableGutters>
            <Card sx={{ width: '90%', maxWidth: '1280px', height: '90%', maxHeight: '800px' }}>
                <CardMedia
                    component="img"
                    src="https://images.unsplash.com/photo-1638913662415-8c5f79b20656?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    height="92%"
                />
                <CardContent sx={{ textAlign: 'center' }}>
                    {!error && (
                        <Badge variant="dot" sx={{ '& > span': { backgroundColor: '#d00000' } }}>
                            <MiddleCardText>Live stream</MiddleCardText>
                        </Badge>
                    )}
                </CardContent>
            </Card>
        </ContainerStyled>
    );
};

export default Dashboard;
