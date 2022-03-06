import { Box, Typography } from '@mui/material';
import React from 'react';

const ErrorHandler = ({ error }) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography>{error}</Typography>
        </Box>
    );
};

export default ErrorHandler;
