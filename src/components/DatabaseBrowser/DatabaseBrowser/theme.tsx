import { createMuiTheme } from '@material-ui/core';



export const theme = createMuiTheme({
    spacing: 50,
    props: {
        MuiButton: {
            variant: 'contained',
            color: 'primary',
        },
    },
    overrides: {
        MuiTableCell: {
            head: {
                fontWeight: 'bold',
            },
        },
    },
});

