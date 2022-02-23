import { Button, Container, Input, InputLabel, Link, Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

export const LoginContainer = styled(Container)(({ theme }) => ({
    width: '100%',
    height: '100vh',
    display: 'flex'
}));

export const LoginInput = styled(Input)(({ theme }) => ({
    border: '1px solid #adb5bd',
    borderRadius: '7px',
    padding: '5px 10px',
    marginTop: '25px !important',
    fontSize: theme.typography.pxToRem(14),
    marginLeft: '5px',
    '& ::placeholder': {
        color: theme.palette.secondary.dark,
        opacity: 0.8
    }
}));

export const LoginStack = styled(Stack)(({ theme }) => ({
    width: '35%',
    maxWidth: '450px',
    minWidth: '250px',
    alignSelf: 'center'
}));

export const LoginHeader = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(42),
    color: theme.palette.secondary.dark
}));

export const LoginSubHeader = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.secondary.dark,
    opacity: 0.7
}));

export const LoginInputLabel = styled(InputLabel)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(18),
    color: `${theme.palette.secondary.dark} !important`,
    fontWeight: 700
}));

export const LogoHeader = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.secondary.dark,
    marginLeft: '10px'
}));

export const ForgotLink = styled(Link)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    fontSize: theme.typography.pxToRem(14),
    textDecoration: 'none',
    cursor: 'pointer',
    marginTop: '16px !important'
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
    marginTop: '24px !important',
    textTransform: 'none',
    color: theme.palette.secondary.light,
    letterSpacing: '0px',
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: '7px',
    padding: '10px 0',
    fontSize: theme.typography.pxToRem(16),
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        opacity: 0.9
    }
}));

export const UnderText = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    opacity: 0.4
}));

export const UnderLink = styled(Link)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    textDecoration: 'none',
    cursor: 'pointer'
}));

export const FormBox = styled(Box)(({ theme }) => ({
    height: '100vh',
    width: '50%',
    paddingTop: '15vh'
}));
