import React, { useEffect, useState } from 'react';
import { InfoText, CircularProgressDark, FingerBox } from '../components/Fingerprint/styles';
import { ContainerStyled } from '../components/NavBar/styles';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

const FingerprintScan = () => {
    const [loading, setLoading] = useState(false);
    const [scan, setScan] = useState(false);
    const [faceScan, setFaceScan] = useState(null);

    const navigate = useNavigate();

    // Redirect on success
    // useEffect(() => {
    //     if (scan) {
    //         setTimeout(() => {
    //             faceScan ? navigate('/dashboard') : navigate('/facial-recognition');
    //         }, 5000);
    //     }
    // }, [scan]);

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
