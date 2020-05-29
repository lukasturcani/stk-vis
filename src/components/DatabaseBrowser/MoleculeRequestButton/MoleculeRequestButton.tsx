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
import { getPageMolecules } from '../../../actions';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function MoleculeRequestButton(props: MoleculeRequestButtonProps)
{
    const [open, setOpen] = React.useState(false);

    const [successMessage, setSuccessMessage]
        = React.useState('Placerholder');

    const successSnackbar = (message: string) => {
        setSuccessMessage(message);
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
                            props.pageData,
                            props.isForward,
                        ),
                        successSnackbar,
                    )
            } >
                { getButtonLabel(props) }
            </Button>
            <Snackbar
                open={ open }
                autoHideDuration={3000}
                onClose={ handleClose }
            ><Alert severity='success' onClose={ handleClose }>
                { successMessage }
            </Alert></Snackbar>
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
