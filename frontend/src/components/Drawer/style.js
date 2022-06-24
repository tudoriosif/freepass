import { Select, styled } from '@mui/material';

export const StyledSelect = styled(Select)(({ theme }) => ({
    fontSize: '14px',
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.secondary.main} !important`
    }
}));
