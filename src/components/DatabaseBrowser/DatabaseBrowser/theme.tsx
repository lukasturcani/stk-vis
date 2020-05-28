import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Paper from '@material-ui/core/Paper';



export const theme = createMuiTheme({
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
                overflow: 'auto',
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
            },
        },
        MuiTableCell: {
            head: {
                fontWeight: 'bold',
            },
        },
    },
});

