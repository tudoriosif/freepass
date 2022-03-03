import { Typography, CircularProgress, Box, Button } from '@mui/material';
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

export const FaceOval = styled('div')(({ theme }) => ({
    width: '20vw',
    height: '45vh',
    minWidth: '350px',
    minHeight: '400px',
    maxWidth: '570px',
    maxHeight: '600px',
    backgroundColor: 'transparent',
    borderRadius: '60%',
    border: `5px dashed ${theme.palette.secondary.light}`,
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: 'translateY(-50%)',
    [theme.breakpoints.down('sm')]: {
        minWidth: '0px',
        minHeight: '0px',
        width: '225px',
        height: '250px'
    }
}));

export const PhotoButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.light,
    width: '250px',
    textTransform: 'none',
    marginTop: '35px',
    '&:hover': {
        backgroundColor: '#000'
    }
}));
