import { Typography, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';

export const InfoText = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    fontWeight: 700,
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(32),
    marginTop: '4rem'
}));

export const CircularProgressDark = styled(CircularProgress)(({ theme }) => ({
    color: theme.palette.secondary.dark
}));

export const FingerBox = styled(Box)(({ theme }) => ({
    width: '750px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20vh'
}));
