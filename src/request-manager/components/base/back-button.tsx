import * as React from 'react';
import {
    BackButtonProps
} from 'RequestManager.RequestManager'


export interface DispatchProps<a>
{
    dispatch: (action: a) => void
}

export type CoreProps<a> = DispatchProps<a> & BackButtonProps<a>;

type Empty = Record<string, unknown>;

interface Props<a> extends BackButtonProps<a>, DispatchProps<a>
{
    container: React.FunctionComponent<Empty>;
    button: React.FunctionComponent<ButtonProps>;
    successSnackbar: React.FunctionComponent<SnackbarProps>;
    errorSnackbar: React.FunctionComponent<SnackbarProps>;
}

export interface ButtonProps
{
    disabled: boolean;
    onClick: () => void;
}

export interface SnackbarProps
{
    open: boolean;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
    message: string;
}

interface Snackbar
{
    open: boolean;
    setOpen: (open: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}


export function BackButton<a>(
    props: Props<a>,
)
{
    const successSnackbar: Snackbar
        = getSnackbar();

    const errorSnackbar: Snackbar
        = getSnackbar();

    return (
        <props.container>
            <props.button
                disabled={props.value0.disabled}
                onClick={
                    () => props.value0.onClick
                        ()
                        (props.dispatch)
                        ({
                            success: successSnackbar,
                            error: errorSnackbar
                        })
                }
            />
            <props.successSnackbar
                open={successSnackbar.open}
                onClose={successSnackbar.onClose}
                message={successSnackbar.message}
            />
            <props.errorSnackbar
                open={errorSnackbar.open}
                onClose={errorSnackbar.onClose}
                message={errorSnackbar.message}
            />
        </props.container>
    );
}

function getSnackbar(): Snackbar
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
