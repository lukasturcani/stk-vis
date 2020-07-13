import * as React from 'react';
import { connect } from 'react-redux';
import {
    IDatabaseBrowser,
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


interface ISnackbar
{
    open: any;
    setOpen: any;
    message: any;
    setMessage: any;
    handleClose: any;
    activate: (message: string) => void;
}


function MoleculeRequestButton(props: MoleculeRequestButtonProps)
{
    const successSnackbar: ISnackbar
        = createSnackbar();

    const errorSnackbar: ISnackbar
        = createSnackbar();

    return (
        <div>
            <Button onClick={
                    props.dispatchPageRequest({
                        pageIndex: getNextPageIndex(
                            props.pageData,
                            props.isForward,
                        ),
                        successSnackbar: successSnackbar.activate,
                        errorSnackbar: errorSnackbar.activate,
                    })
            } >
                { getButtonLabel(props) }
            </Button>
            <Snackbar
                open={ successSnackbar.open }
                autoHideDuration={ 6000 }
                onClose={ successSnackbar.handleClose }
            >
                <Alert
                    severity={ 'success' }
                    onClose={ successSnackbar.handleClose }
                >
                    { successSnackbar.message }
                </Alert>

            </Snackbar>
            <Snackbar
                open={ errorSnackbar.open }
                autoHideDuration={ 6000 }
                onClose={ errorSnackbar.handleClose }
            >
                <Alert
                    severity={ 'error' }
                    onClose={ errorSnackbar.handleClose }
                >
                    { errorSnackbar.message }
                </Alert>

            </Snackbar>
        </div>
    );
}


function createSnackbar()
    : ISnackbar
{
    const [open, setOpen] = React.useState(false);

    const [message, setMessage]
        = React.useState('Placeholder');

    const activate = (message: string) => {
        setMessage(message);
        setOpen(true);
    };
    const handleClose
        = (event?: React.SyntheticEvent, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpen(false);
        };
    return {
        open,
        setOpen,
        message,
        setMessage,
        handleClose,
        activate,
    };
}


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
}


export const MoleculeRequestButtonComponent
    = connect
        (mapStateToProps, mapDispatchToProps)(MoleculeRequestButton);
