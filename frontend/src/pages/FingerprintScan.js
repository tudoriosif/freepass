import React, { useEffect, useState, useRef } from 'react';
import { InfoText, CircularProgressDark, FingerBox } from '../components/Biometrics/styles';
import { ContainerStyled } from '../components/NavBar/styles';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate, useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { scanFinger, checkFinger } from '../redux/slices/fingerSlice';
import { useDispatch, useSelector } from 'react-redux';

const FingerprintScan = () => {
    const isMounted = useRef(false);

    // Condition if login is passed to be added
    const loading = useSelector((state) => state.user.loading);
    const fingerScan = useSelector((state) => state.user.fingerToken);
    const faceScan = useSelector((state) => state.user.faceToken);
    const hasFinger = useSelector((state) => state.user.hasFinger);
    const [scan, setScan] = useState(null); // null = Not Scanned, true = Scanned successfully, false = Scanned failed

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { isSignup } = location.state;
    const action = isSignup || !hasFinger ? scanFinger : checkFinger;

    // Redirect on success
    useEffect(() => {
        if (fingerScan) {
            setTimeout(() => {
                faceScan ? navigate('/dashboard') : navigate('/face-recognition', { state: location.state });
            }, 5000);
        }
    }, [fingerScan]);

    useEffect(() => {
        // Skip first render
        if (isMounted.current) {
            setScan(fingerScan ? true : false);
        } else {
            isMounted.current = true;
        }
    }, [fingerScan]);

    // Wait 1sec then send request to wait to BE
    useEffect(() => {
        setTimeout(() => {
            dispatch(action({}));
        }, 1000);
    }, []);

    return (
        <ContainerStyled
            maxWidth={false}
            disableGutters
            sx={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <FingerBox>
                {loading && (
                    <>
                        <CircularProgressDark size="75px" />
                        <InfoText component="div">
                            Place your finger on system scanner and wait until data is read
                        </InfoText>
                    </>
                )}
                {scan === true && (
                    <>
                        <DoneAllIcon sx={{ fontSize: '75px' }} />
                        <InfoText component="div">
                            Your fingerprint was successfully scanned <br />
                            {faceScan
                                ? `You'll be redirected to dashboard...`
                                : `You'll be redirected to Face recognition...`}
                        </InfoText>
                    </>
                )}
                {scan === false && (
                    <>
                        <CancelIcon sx={{ fontSize: '75px' }} />
                        <InfoText component="div">
                            Something went wrong... <br />
                            Your fingerprint does not match or couldn&apos;t be scanned <br />
                            Please try again
                        </InfoText>
                    </>
                )}
            </FingerBox>
        </ContainerStyled>
    );
};

export default FingerprintScan;
