import React from 'react';
import { SplitContainer } from '../components/Login/styles';
import MetricAccess from '../components/Multimodal/MetricAccess';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { useLocation } from 'react-router-dom';

const MultimodalAccess = () => {
    // Condition if login is passed to be added
    const location = useLocation();

    return (
        <SplitContainer disableGutters maxWidth={false}>
            <MetricAccess ProvidedIcon={TouchAppIcon} to="/fingerprint-scan" />
            <MetricAccess isLight to="/face-recognition" state={{ isSignup: location?.state?.prevPath !== '/' }} />
        </SplitContainer>
    );
};

export default MultimodalAccess;
