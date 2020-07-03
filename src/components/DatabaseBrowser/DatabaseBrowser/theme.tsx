import createMuiTheme from '@material-ui/core/styles/createMuiTheme';


export const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
    props: {
        MuiButton: {
            variant: 'contained',
            color: 'primary',
        },
    },
    overrides: {
        MuiLink: {
            root: {
                display: 'flex',
            },
        },
        MuiTypography: {
            root: {
                display: 'flex',
            },
        },
        MuiPaper: {
            root: {
            },
        },
        MuiButton: {
            root: {
            },
        },
        MuiTextField: {
            root: {
                marginTop: '20px',
            },
        },
        MuiTableCell: {
            head: {
                fontWeight: 'bold',
            },
        },
        MuiFormControl: {
            root: {
                marginTop: '20px',
            },
        },
    },
});
