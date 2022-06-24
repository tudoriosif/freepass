import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const ContainerStyled = styled(Container)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
}));

export const MiddleCardText = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.secondary.dark,
    fontWeight: theme.typography.fontWeightLight
}));

export const NoImageBoard = styled('div')(({ theme }) => ({
    width: '100%',
    height: '92%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));
