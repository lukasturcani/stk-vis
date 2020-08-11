import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'
import {
    MongoConfigurator as MongoConfiguratorBase,
    CoreProps,
    ButtonProps,
    SnackbarProps,
} from 'mongo-configurator/base/mongo-configurator';
import {
    InputFields
} from './input-fields';


export function MongoConfigurator<a>(
    props: CoreProps<a>,
)
{
    return <MongoConfiguratorBase
        component={ Container }
        inputFields={ InputFields }
        button={ Button }
        successSnackbar={SuccessSnackbar}
        errorSnackbar={ErrorSnackbar}
        { ...props }
    />
}


const Container: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <Grid container
            alignItems={ 'center' }
            alignContent={ 'center' }
            justify={ 'center' }
            spacing={ 3 }
            style={{
                height: '100%',
                width: '99vw',
                paddingTop: '1%',
            }}
            direction='column'
        >
            { props.children }
        </Grid>
    );

const Button: React.FunctionComponent<ButtonProps>
    = (props) => (
        <ButtonBase
            variant={ 'contained' }
            color={ 'primary' }
            {...props}
        >
            <SearchIcon />
        </ButtonBase>
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
