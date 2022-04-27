import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { CircularProgressDark, FaceOval, InfoText, PhotoButton } from '../components/Biometrics/styles';
import { ContainerStyled } from '../components/NavBar/styles';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { sendPhoto, checkPhoto } from '../redux/slices/photoSlice';
import { takePhotos } from '../utils/utils';

const videoConstraints = {
    width: 1280,
    height: 720
};

const FaceRecognition = () => {
    // Condition if login is passed to be added
    const webcamRef = useRef(null);
    const isMounted = useRef(false);

    const [photosArray, setPhotosArray] = useState([]);

    const loading = useSelector((state) => state.user.loading);
    const fingerScan = useSelector((state) => state.user.fingerToken);
    const faceScan = useSelector((state) => state.user.faceToken);
    const hasFace = useSelector((state) => state.user.hasFace);
    const [scan, setScan] = useState(null); // null = Not Scanned, true = Scanned successfully, false = Scanned failed

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { isSignup } = location?.state;
    const action = isSignup || !hasFace ? sendPhoto : checkPhoto;

    const capture = useCallback(async () => {
        if (isSignup) {
            const photos = await takePhotos(webcamRef, 12);

            setPhotosArray(photos);
        } else {
            const photoBase64 = webcamRef.current.getScreenshot();

            dispatch(action({ photoBase64 }));
        }
    }, [webcamRef]);

    useEffect(() => {
        if (faceScan) {
            setTimeout(() => {
                fingerScan ? navigate('/dashboard') : navigate('/fingerprint-scan', { state: location.state });
            }, 5000);
        }
    }, [faceScan]);

    useEffect(() => {
        if (photosArray.length > 0) {
            dispatch(action({ photosBase64: photosArray }));
        }
    }, [photosArray]);

    useEffect(() => {
        // Skip first render
        if (isMounted.current) {
            setScan(faceScan ? true : false);
        } else {
            isMounted.current = true;
        }
    }, [faceScan]);

    return (
        <ContainerStyled
            maxWidth={false}
            disableGutters
            sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <ContainerStyled
                maxWidth="md"
                disableGutters
                sx={{ height: '50vh', minHeight: '350px', position: 'relative' }}>
                <Webcam
                    audio={false}
                    height="100%"
                    width="100%"
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <FaceOval />
            </ContainerStyled>
            <ContainerStyled
                maxWidth="md"
                disableGutters
                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                {loading && (
                    <>
                        <CircularProgressDark size="35px" sx={{ marginTop: '20px' }} />
                    </>
                )}
                {!loading && scan !== true && (
                    <>
                        <InfoText component="div" sx={{ fontSize: '24px', marginTop: '10px' }}>
                            Place your face within the marked position, look at the camera then press &quot;Send
                            photo&quot; and wait 3 seconds
                        </InfoText>
                    </>
                )}
                {scan === true && (
                    <>
                        <DoneAllIcon sx={{ fontSize: '75px', marginTop: '20px' }} />
                        <InfoText component="div" sx={{ fontSize: '24px', marginTop: '10px' }}>
                            Your fingerprint was successfully scanned <br />
                            {fingerScan
                                ? `You'll be redirected to dashboard...`
                                : `You'll be redirected to Fingerprint scan...`}
                        </InfoText>
                    </>
                )}
                {scan === false && (
                    <>
                        <CancelIcon sx={{ fontSize: '75px', marginTop: '20px' }} />
                        <InfoText component="div" sx={{ fontSize: '24px', marginTop: '10px' }}>
                            Something went wrong... <br />
                            Your face does not match or couldn&apos;t be scanned <br />
                            Please try again
                        </InfoText>
                    </>
                )}
                <PhotoButton variant="contained" onClick={capture}>
                    Send photo
                </PhotoButton>
            </ContainerStyled>
        </ContainerStyled>
    );
};
export default FaceRecognition;
