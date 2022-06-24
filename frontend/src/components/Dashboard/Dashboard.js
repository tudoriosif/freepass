import { Badge, Card, CardContent, CardMedia, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransmission, closeTransmission } from '../../redux/slices/camSlice';

import { ContainerStyled, MiddleCardText, NoImageBoard } from './styles.js';

// import { useTimer } from 'react-timer-hook';

const webSocketCam = new WebSocket('ws://localhost:8000/stream_cam');
const webSocketPIR = new WebSocket('ws://localhost:8000/pir_sensor');

webSocketCam.onopen = () => {
    console.log('WSC Connected to server!');
};

webSocketCam.onclose = () => {
    console.log('WSC Closed Connection!');
};

webSocketPIR.onopen = () => {
    console.log('WSP Connected to server!');
};

webSocketPIR.onclose = () => {
    console.log('WSP Closed Connection!');
};

webSocketPIR.onmessage = (message) => {
    console.log(message.data);
};

// let fps = 0;

const Dashboard = () => {
    const [videoURL, setVideoURL] = useState(null);

    const dispatch = useDispatch();

    const message = useSelector((state) => state.cam.message);
    const error = useSelector((state) => state.cam.error);
    const loading = useSelector((state) => state.cam.loading);

    webSocketCam.onmessage = (message) => {
        // console.log(message.data); // convert to URL.createObjectURL -> image donee
        const url = URL.createObjectURL(message.data);
        // fps++;
        setVideoURL(url);
    };

    // const time = new Date();
    // time.setSeconds(time.getSeconds() + 60);
    // const { seconds, minutes, hours } = useTimer({ expiryTimestamp: time, onExpire: () => console.log(fps) });

    // console.log(time, seconds, minutes, hours);

    useEffect(() => {
        dispatch(createTransmission({ nodeNumber: 1 }));

        return () => dispatch(closeTransmission({ nodeNumber: 1 }));
    }, []);

    return (
        <ContainerStyled maxWidth={false} disableGutters>
            <Card sx={{ width: '90%', maxWidth: '1280px', height: '90%', maxHeight: '800px' }}>
                {videoURL ? (
                    <CardMedia component="img" src={videoURL} height="92%" />
                ) : (
                    <NoImageBoard> No image yet!</NoImageBoard>
                )}
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
