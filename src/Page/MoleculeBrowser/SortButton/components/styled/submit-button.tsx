import * as React from 'react';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import {
    CoreProps,
    ButtonProps,
    SubmitButton as SubmitButtonBase,
    SnackbarProps,
} from '../base/submit-button';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import SnackbarBase from '@material-ui/core/Snackbar'

export function SubmitButton<a>(
    props: CoreProps<a>,
)
{
    return <SubmitButtonBase
        button={StyledButton}
        snackbar={Snackbar}
        {...props}
    />;
}


const StyledButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Button
            variant={ 'contained' }
            color={ 'primary' }
            {...props}
        >
            <DoneIcon />
        </Button>
    );

const Snackbar: React.FunctionComponent<SnackbarProps>
    = props => (
        <SnackbarBase
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
    );

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
