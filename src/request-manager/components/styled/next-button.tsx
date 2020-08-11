import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Snackbar from '@material-ui/core/Snackbar'
import RefreshIcon from '@material-ui/icons/Refresh';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {
    ButtonProps,
    NextButton as NextButtonBase,
    CoreProps,
    SnackbarProps,
} from 'request-manager/base/next-button';


export function NextButton<a>(
    props: CoreProps<a>
)
{
    if (props.value0.lastPage)
    {
        return <NextButtonBase
            container={Container}
            button={LastButton}
            successSnackbar={SuccessSnackbar}
            errorSnackbar={ErrorSnackbar}
            {...props}
        />;
    }
    return <NextButtonBase
        button={NonLastButton}
        {...props}
    />;
}

type Empty = Record<string, unknown>;

const Container: React.FunctionComponent<Empty>
    = (props) => <div>{props.children}</div>;


const NonLastButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Grid item>
            <Button
                variant={ 'contained' }
                color={ 'primary' }
                {...props}
            >
                <NavigateNextIcon />
            </Button>
        </Grid>
    );

const LastButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Grid item>
            <Button
                variant={ 'contained' }
                color={ 'primary' }
                {...props}
            >
                <RefreshIcon />
            </Button>
        </Grid>
    );

const SuccessSnackbar: React.FunctionComponent<SnackbarProps>
    = props => (
        <Snackbar
            open={props.open}
            onClose={props.onClose}
            autoHideDuration={6000}
        >
            <Alert
                severity='success'
                onClose={props.onClose}
            >
                {props.message}
            </Alert>
        </Snackbar>
    );

const ErrorSnackbar: React.FunctionComponent<SnackbarProps>
    = props => (
        <Snackbar
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
        </Snackbar>
    );


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
