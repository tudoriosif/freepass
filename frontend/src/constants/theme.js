import { createTheme } from '@mui/material';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#40aae8',
            light: '#a4d5f2',
            dark: '#438eba'
        },
        secondary: {
            main: '#cbd0d3',
            light: '#e1e5e8',
            dark: '#393e41'
        }
    }
});

export default customTheme;
