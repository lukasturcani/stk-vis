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
                marginTop: '10px',
            },
        },
        MuiTableCell: {
            head: {
                fontWeight: 'bold',
            },
        },
    },
});

