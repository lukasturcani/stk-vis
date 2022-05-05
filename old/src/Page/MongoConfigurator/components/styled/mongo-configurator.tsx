import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/Button';
import MuiContainer from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'
import {
    MongoConfigurator as MongoConfiguratorBase,
    CoreProps,
    ButtonProps,
    SnackbarProps,
} from '../base/mongo-configurator';
import {
    InputFields
} from './input-fields';
import {
    LoadConfigButton,
} from './load-config-button';
import {
    SaveConfigButton,
} from './save-config-button';


export function MongoConfigurator<a>(
    props: CoreProps<a>,
)
{
    return <MongoConfiguratorBase
        component={ Container }
        configButtonContainer={ ConfigButtonContainer }
        inputFields={ InputFields }
        button={ Button }
        successSnackbar={SuccessSnackbar}
        errorSnackbar={ErrorSnackbar}
        loadConfigButton={LoadConfigButton}
        saveConfigButton={SaveConfigButton}
        { ...props }
    />
}


type Empty = Record<string, unknown>;

const Container: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <MuiContainer
            style={{
                padding: '40px',
            }}
        >
            <Paper
                style={{
                    padding: '40px',
                }}
            >
                <Grid container
                    alignItems={ 'center' }
                    alignContent={ 'center' }
                    justify={ 'center' }
                    spacing={ 3 }
                    direction='row'
                >
                    { props.children }
                </Grid>
            </Paper>
        </MuiContainer>
    );

const ConfigButtonContainer: React.FunctionComponent<Empty>
    = (props) => (
        <Grid container
            alignItems='center'
            alignContent='center'
            justify='center'
            spacing={3}
            direction='row'
        >
            {props.children}
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
