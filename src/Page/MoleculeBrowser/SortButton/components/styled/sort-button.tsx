import * as React from 'react';
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';
import Grid from '@material-ui/core/Grid';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import SnackbarBase from '@material-ui/core/Snackbar'
import {
    SortButton as SortButtonBase,
    ButtonProps,
    SnackbarProps,
} from '../base/sort-button';
import {
    CoreProps
} from '../base/sort-button';
import {
    SortSettings,
} from '../styled/sort-settings';


export function SortButton<a>(
    props: CoreProps<a>,
)
{
    return <SortButtonBase
        container={Container}
        button={StyledButton}
        sortSettings={SortSettings}
        snackbar={Snackbar}
        {...props}
    />;
}

type Empty = Record<string, unknown>;

const Container: React.FunctionComponent<Empty>
    = (props) => (
        <Grid item
            xs={12}
        >
            {props.children}
        </Grid>
    );


const StyledButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Button
            variant={ 'contained' }
            color={ 'secondary' }
            {...props}
        >
            <SortIcon />
        </Button>
    );

const Snackbar: React.FunctionComponent<SnackbarProps>
    = props => {
        return <SnackbarBase
            open={props.open}
            onClose={props.onClose}
            autoHideDuration={6000}
        >
            <Alert
                severity='error'
                onClose={props.onClose}
            >
                {props.message}
            </Alert>
        </SnackbarBase>
    };

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
