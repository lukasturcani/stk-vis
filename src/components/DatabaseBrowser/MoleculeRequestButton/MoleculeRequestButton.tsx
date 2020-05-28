import * as React from 'react';
import { connect } from 'react-redux';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    PageKind,
} from '../../../models';
import {
    MoleculeRequestButtonProps,
    maybeGetPageIndex,
    maybeGetPageKind,
    getButtonLabel,
    getNextPageIndex,
} from './utilities';
import { getPageMolecules } from '../../../actions';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function MoleculeRequestButton(props: MoleculeRequestButtonProps)
{
    const success = { message: 'This should have a message.' };
    const [open, setOpen] = React.useState(false);
    const successSnackbar = (message: string) => {
        console.log(message);
        success.message = message;
        setOpen(true);
    };
    const handleClose
        = (event?: React.SyntheticEvent, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpen(false);
        };

    return (
        <div>
            <Button onClick={
                    props.dispatchPageRequest(
                        getNextPageIndex(
                            props.pageIndex,
                            props.isForward,
                            props.pageKind,
                        ),
                        successSnackbar,
                    )
            } >
                { getButtonLabel(props) }
            </Button>
            <Snackbar
                open={ open }
                autoHideDuration={6000}
                onClose={ handleClose }
            ><Alert severity='success' onClose={ handleClose }>
                { success.message }
            </Alert></Snackbar>
        </div>
    );
};


const mapStateToProps = (state: IDatabaseBrowser) => {
    return {
        pageIndex: maybeGetPageIndex(state),
        pageKind: maybeGetPageKind(state),
    };
};


function mapDispatchToProps(dispatch: (arg: any) => any)
{
    return {
        dispatchPageRequest:
            (
                pageIndex: number,
                successSnackbar: (message: string) => void,
            ) => () =>
                dispatch(getPageMolecules(pageIndex, successSnackbar)),
    };
};


export const MoleculeRequestButtonComponent
    = connect
        (mapStateToProps, mapDispatchToProps)(MoleculeRequestButton);
