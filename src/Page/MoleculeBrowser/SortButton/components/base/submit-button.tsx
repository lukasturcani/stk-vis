import * as React from 'react';
import {
    SortType,
    ascending,
    descending,
} from 'SortType';
import { Snackbar } from 'Snackbar';

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}


export interface BaseProps<a>
{
    sortType: 'ascending' | 'descending';
    setOpen: (open: boolean) => void;
    collection: string;

    setSorted:
        () =>
        (dispatch: (action: a) => void) =>
        (snackbar: Snackbar) =>
        (collection: string) =>
        (sortType: SortType) =>
        Promise<void>;

    setUnsorted:
        () =>
        (dispatch: (action: a) => void) =>
        (snackbar: Snackbar) =>
        Promise<void>;

}


export type CoreProps<a> = BaseProps<a> & DispatchProps<a>;


interface Props<a> extends BaseProps<a>, DispatchProps<a>
{
    button: React.FunctionComponent<ButtonProps>;
    snackbar: React.FunctionComponent<SnackbarProps>;
}

export interface SnackbarProps
{
    open: boolean;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
    message: string;
}


interface SnackbarData
{
    open: boolean;
    setOpen: (open: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}


export interface ButtonProps
{
    onClick: () => void;
}


export function SubmitButton<a>(
    props: Props<a>,
)
{
    const snackbar: SnackbarData
        = getSnackbarData();

    return (
        <div>
            <props.button
                onClick={
                    () => {
                        props.setOpen(false);
                        if (props.collection === '')
                        {
                            props.setUnsorted
                                ()
                                (props.dispatch)
                                (snackbar);
                        }
                        else
                        {
                            props.setSorted
                                ()
                                (props.dispatch)
                                (snackbar)
                                (props.collection)
                                (
                                    props.sortType === 'ascending'?
                                    ascending : descending
                                );
                        }
                    }
                }
            />
            <props.snackbar
                open={snackbar.open}
                onClose={snackbar.onClose}
                message={snackbar.message}
            />
        </div>
    );
}

function getSnackbarData(): SnackbarData
{
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const onClose = (event?: React.SyntheticEvent, reason?: string) =>
    {
        if (reason === 'clickaway')
        {
            return;
        }
        setOpen(false);
    };

    return {
        open,
        setOpen,
        message,
        setMessage,
        onClose,
    };
}
