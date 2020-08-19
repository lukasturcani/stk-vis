import * as React from 'react';
import {
    Props as SortButtonProps
} from 'Page.MoleculeBrowser.SortButton';
import {
    CoreProps as SortSettingsProps,
} from './sort-settings';


type Empty = Record<string, unknown>;

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export type CoreProps<a> = SortButtonProps<a> & DispatchProps<a>;

interface Props<a> extends SortButtonProps<a>, DispatchProps<a>
{
    container: React.FunctionComponent<Empty>;
    button: React.FunctionComponent<ButtonProps>;
    sortSettings: React.FunctionComponent<SortSettingsProps<a>>;
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


export function SortButton<a>(
    props: Props<a>,
)
{
    const [open, setOpen] =  React.useState(false);

    const snackbar: SnackbarData
        = getSnackbarData();

    return (
        <props.container>
            <props.button
                onClick={ () => setOpen(true) }
            />
            <props.sortSettings
                dispatch={props.dispatch}
                setUnsorted={props.setUnsorted}
                setSorted={props.setSorted}
                open={open}
                setOpen={setOpen}
                collections={props.collections}
                snackbar={snackbar}
            />
            <props.snackbar
                open={snackbar.open}
                onClose={snackbar.onClose}
                message={snackbar.message}
            />
        </props.container>
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
