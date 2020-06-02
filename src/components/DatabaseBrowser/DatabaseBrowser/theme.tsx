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
        MuiContainer: {
            root: {
                height: '99vh',
                paddingTop: '30px',
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
    },
});
