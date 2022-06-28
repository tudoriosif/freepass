import { Badge, Card, CardContent, CardMedia, Container, InputLabel, MenuItem, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransmission, closeTransmission } from '../../redux/slices/camSlice';
import { getAvailableCameras } from '../../redux/thunks/node';
import { StyledSelect } from '../Drawer/style';

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

    const availableCameras = useSelector((state) => state.node.availableCameras);

    const [activeCamera, setActiveCamera] = useState(null);

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
        !availableCameras.length && dispatch(getAvailableCameras());

        return () => {
            dispatch(closeTransmission({ nodeNumber: 1 }));
        };
    }, []);

    useEffect(() => {
        !!availableCameras.length && setActiveCamera(availableCameras[0]);
    }, [availableCameras]);

    useEffect(() => {
        !!activeCamera && dispatch(createTransmission({ nodeNumber: activeCamera?.addr }));
    }, [activeCamera]);

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
            {!!availableCameras.length && !!activeCamera && (
                <Stack sx={{ position: 'absolute', bottom: '20%' }}>
                    <InputLabel id="select-label">Choose a camera</InputLabel>
                    <StyledSelect
                        labelId="select-label"
                        value={activeCamera.name}
                        label="component"
                        onChange={(event) =>
                            setActiveCamera(availableCameras.filter((camera) => camera.name === event.target.value)[0])
                        }>
                        {availableCameras.map((camera, index) => (
                            <MenuItem key={index} value={camera.name}>
                                {camera.name}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </Stack>
            )}
        </ContainerStyled>
    );
};

export default Dashboard;
