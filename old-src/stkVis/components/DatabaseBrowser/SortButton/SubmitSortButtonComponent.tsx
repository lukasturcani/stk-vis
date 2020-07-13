import * as React from 'react';
import { connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import {
    SortType,
    SortSettingsKind,
} from '../../../models';
import {
    setSortSettings,
} from  '../../../actions';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { getPageMolecules } from '../../../actions';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


interface getFirstPageOptions
{
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
}


interface SubmitSortButtonProps
{
    setOpen: (open: boolean) => void;
    dispatchSetSortSettings:
        (sortedCollection: string, sortType: SortType) => void;
    sortedCollection: string;
    sortType: SortType;
    getFirstPage: (options: getFirstPageOptions) => () => void;
}


interface SubmitSortOptions
{
    setOpen: (open: boolean) => void;
    dispatchSetSortSettings:
        (sortedCollection: string, sortType: SortType) => void;
    sortedCollection: string;
    sortType: SortType;
    getFirstPage: (options: getFirstPageOptions) => () => void;
    getFirstPageOptions: getFirstPageOptions;
}


function submitSort(
    options: SubmitSortOptions,
)
{
    return () => {
        options.setOpen(false);
        options.dispatchSetSortSettings(
            options.sortedCollection,
            options.sortType,
        );
        options.getFirstPage(options.getFirstPageOptions)();
    };
}


function SubmitSortButton(
    props: SubmitSortButtonProps,
)
{
    const successSnackbar: ISnackbar
        = createSnackbar();

    const errorSnackbar: ISnackbar
        = createSnackbar();

    return (
        <div>
            <Button
                onClick={
                    submitSort({
                        setOpen: props.setOpen,
                        sortedCollection: props.sortedCollection,
                        sortType: props.sortType,
                        dispatchSetSortSettings:
                            props.dispatchSetSortSettings,
                        getFirstPage: props.getFirstPage,
                        getFirstPageOptions: {
                            successSnackbar: successSnackbar.activate,
                            errorSnackbar: errorSnackbar.activate,
                        },
                    })
                }
            >
                <DoneIcon />
            </Button>
            <Snackbar
                open={ successSnackbar.open }
                autoHideDuration={6000}
                onClose={ successSnackbar.handleClose }
            >
                <Alert
                    severity='success'
                    onClose={ successSnackbar.handleClose }
                >
                    { successSnackbar.message }
                </Alert>
            </Snackbar>
            <Snackbar
                open={ errorSnackbar.open }
                autoHideDuration={6000}
                onClose={ errorSnackbar.handleClose }
            >
                <Alert
                    severity='error'
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


interface ISnackbar
{
    open: any;
    setOpen: any;
    message: any;
    setMessage: any;
    handleClose: any;
    activate: (message: string) => void;
}


function mapDispatchToProps(
    dispatch: (action: any) => void,
)
{
    return {
        dispatchSetSortSettings:
            (sortedCollection: string, sortType: SortType) => {
                if ( sortedCollection === '')
                {
                    dispatch(setSortSettings({
                        kind: SortSettingsKind.Unsorted,
                    }));
                }
                else
                {
                    dispatch(setSortSettings({
                        kind: SortSettingsKind.Sorted,
                        collection: sortedCollection,
                        sortType,
                    }))
                }
            },

        getFirstPage:
            (options: getFirstPageOptions) => () => dispatch(
                getPageMolecules({
                    pageIndex: 0,
                    ...options,
                })
            ),
    };
}



export const SubmitSortButtonComponent
    = connect(undefined, mapDispatchToProps)(SubmitSortButton);
