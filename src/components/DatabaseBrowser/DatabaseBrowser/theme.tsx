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
        MuiButton: {
            root: {
                margin: '10px',
            },
        },
        MuiTextField: {
            root: {
                margin: '10px',
            },
        },
        MuiTableCell: {
            head: {
                fontWeight: 'bold',
            },
        },
    },
});

