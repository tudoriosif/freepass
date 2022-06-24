import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const CustomLoadingButton = styled(LoadingButton)(({ theme }) => ({
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

export const CustomOutlinedButton = styled(Button)(({ theme }) => ({
    marginTop: '24px !important',
    textTransform: 'none',
    color: theme.palette.secondary.dark,
    letterSpacing: '0px',
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: '7px',
    padding: '10px 0',
    fontSize: theme.typography.pxToRem(16),
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        opacity: 0.5,
        color: theme.palette.secondary.light
    }
}));
