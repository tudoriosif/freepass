import { AppBar, Container, Toolbar, Typography, Box, Link, SvgIcon } from '@mui/material';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircleSharp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('md')]: {
        justifyContent: 'space-between'
    }
}));

export const ContainerStyled = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main
}));

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    boxShadow: 'none'
}));

export const AccountIcon = styled(AccountCircleIcon)(({ theme, light }) => ({
    fontSize: theme.typography.pxToRem(35),
    color: light ? theme.palette.secondary.light : theme.palette.secondary.dark
}));

export const FingerPrintIcon = styled(FingerprintIcon)(({ theme, light }) => ({
    fontSize: theme.typography.pxToRem(35),
    color: light ? theme.palette.secondary.light : theme.palette.secondary.dark
}));

export const LayoutIcon = styled(DashboardIcon)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(35),
    color: theme.palette.secondary.dark
}));

export const SystemText = styled(Link)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    fontSize: theme.typography.pxToRem(14),
    textDecoration: 'none',
    cursor: 'pointer'
}));

export const RightBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

export const LogoBox = styled(Box)(({ theme }) => ({
    minHeight: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 12px',
    backgroundColor: theme.palette.secondary.dark
}));

export const PageTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    opacity: '0.5'
}));

export const SideBox = styled(Box)(({ theme, isOpen }) => ({
    paddingTop: '32px',
    height: '100vh',
    width: !isOpen ? '59px' : '150px',
    borderTop: !isOpen && `1px solid ${theme.palette.secondary.light}`,
    backgroundColor: theme.palette.secondary.dark,

    [theme.breakpoints.down('md')]: {
        ...(isOpen && {
            minWidth: '85px',
            width: '25%',
            maxWidth: '150px'
        })
    },

    [theme.breakpoints.down('sm')]: {
        ...(!isOpen && {
            display: 'none'
        })
    }
}));

export const SideLinkBox = styled(Box)(({ theme, isOpen }) => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: '64px',
    cursor: 'pointer',

    [theme.breakpoints.down('md')]: {
        ...(isOpen && {
            flexDirection: 'column'
        })
    }
}));

export const StyledIcon = styled(SvgIcon)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(35),
    padding: '0 12px',
    color: theme.palette.secondary.light
}));

export const SideLinkText = styled(({ isOpen, ...rest }) => <Typography {...rest} />)(({ theme, isOpen }) => ({
    color: theme.palette.secondary.light,
    display: isOpen ? 'flex' : 'none',
    fontWeight: '100'
}));
