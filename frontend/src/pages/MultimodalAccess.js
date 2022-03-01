import React from 'react';
import { SplitContainer } from '../components/Login/styles';
import MetricAccess from '../components/Multimodal/MetricAccess';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const MultimodalAccess = () => {
    return (
        <SplitContainer disableGutters maxWidth={false}>
            <MetricAccess ProvidedIcon={TouchAppIcon} to="/fingerprint-scan" />
            <MetricAccess isLight to="/facial-recognition" />
        </SplitContainer>
    );
};

export default MultimodalAccess;
