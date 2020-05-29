import * as React from 'react';
import { connect } from 'react-redux';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    PageKind,
} from '../../../models';
import {
    MoleculeRequestButtonProps,
    maybeGetPageData,
    getButtonLabel,
    getNextPageIndex,
} from './utilities';
import {
    getPageMolecules,
    getPageMoleculesOptions,
} from '../../../actions';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function MoleculeRequestButton(props: MoleculeRequestButtonProps)
{
    const [successOpen, successSetOpen] = React.useState(false);

    const [successMessage, successSetMessage]
        = React.useState('Placerholder');

    const successSnackbar = (message: string) => {
        successSetMessage(message);
        successSetOpen(true);
    };
    const successHandleClose
        = (event?: React.SyntheticEvent, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

            successSetOpen(false);
        };
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
            <Button onClick={
                    props.dispatchPageRequest({
                        pageIndex: getNextPageIndex(
                            props.pageData,
                            props.isForward,
                        ),
                        successSnackbar,
                        errorSnackbar,
                    })
            } >
                { getButtonLabel(props) }
            </Button>
            <Snackbar
                open={ successOpen }
                autoHideDuration={6000}
                onClose={ successHandleClose }
            >
                <Alert
                    severity='success'
                    onClose={ successHandleClose }
                >
                    { successMessage }
                </Alert>
            </Snackbar>
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
};


const mapStateToProps = (state: IDatabaseBrowser) => {
    return {
        pageData: maybeGetPageData(state),
    };
};


function mapDispatchToProps(dispatch: (arg: any) => any)
{
    return {
        dispatchPageRequest:
            (options: getPageMoleculesOptions) => () =>
                dispatch(getPageMolecules(options)),
    };
};


export const MoleculeRequestButtonComponent
    = connect
        (mapStateToProps, mapDispatchToProps)(MoleculeRequestButton);
