import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../models';
import { AnyAction } from '@reduxjs/toolkit';
import Button from '@material-ui/core/Button';
import { getPageMolecules } from '../../../actions';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


interface getFirstPageOptions
{
    errorSnackbar: (message: string) => void;
}


interface IGetMoleculesButtonProps
{
    getFirstPage: (options: getFirstPageOptions) => () => void;
}


function GetMoleculesButton(
    props: IGetMoleculesButtonProps,
)
{
    const [errorOpen, errorSetOpen] = React.useState(false);

    const [errorMessage, errorSetMessage]
        = React.useState('Placerholder');

    const errorSnackbar = (message: string) => {
        errorSetMessage(message);
        errorSetOpen(true);
    };
    const errorHandleClose
        = (event?: React.SyntheticEvent, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

            errorSetOpen(false);
        };
    return (
        <div>
            <Button
                onClick={
                    props.getFirstPage({errorSnackbar})
                }
            >
                Get Molecules
            </Button>
            <Snackbar
                open={ errorOpen }
                autoHideDuration={6000}
                onClose={ errorHandleClose }
            >
                <Alert severity='error' onClose={ errorHandleClose }>
                    { errorMessage }
                </Alert>
            </Snackbar>
        </div>
    );
}


function mapStateToProps(
    state: IState,
)
{
    return {
    };
}


function mapDispatchToProps(
    dispatch: (action: any) => void,
)
{
    return {
        getFirstPage:
            (options: getFirstPageOptions) => () => dispatch(
                getPageMolecules({
                    pageIndex: 0,
                    successSnackbar: (message: string) => {},
                    ...options,
                })
            ),
    };
}



export const GetMoleculesButtonComponent
    = connect(mapStateToProps, mapDispatchToProps)(GetMoleculesButton);
