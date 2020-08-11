import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Snackbar from '@material-ui/core/Snackbar'
import RefreshIcon from '@material-ui/icons/Refresh';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {
    BackButton as BackButtonBase,
    CoreProps,
    ButtonProps,
    SnackbarProps,
} from 'request-manager/base/back-button';

export function BackButton<a>(
    props: CoreProps<a>,
)
{
    return <BackButtonBase
        button={StyledButton}
        container={Container}
        successSnackbar={SuccessSnackbar}
        errorSnackbar={ErrorSnackbar}
        {...props}
    />;
}


const StyledButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Grid item>
            <Button
                variant={ 'contained' }
                color={ 'primary' }
                {...props}
            >
                <NavigateBeforeIcon />
            </Button>
        </Grid>
    );

type Empty = Record<string, unknown>;

const Container: React.FunctionComponent<Empty>
    = (props) => <Grid item>{props.children}</Grid>;


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
