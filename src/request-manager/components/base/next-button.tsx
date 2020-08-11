import * as React from 'react';
import{
    NextButtonProps,
} from 'RequestManager.RequestManager'

export interface DispatchProps<a>
{
    dispatch: (action: a) => void
}

export type CoreProps<a> = DispatchProps<a> & NextButtonProps<a>;

type Empty = Record<string, unknown>;

interface Props<a> extends NextButtonProps<a>, DispatchProps<a>
{
    container: React.FunctionComponent<Empty>;
    button: React.FunctionComponent<ButtonProps>;
    successSnackbar: React.FunctionComponent<SnackbarProps>;
    errorSnackbar: React.FunctionComponent<SnackbarProps>;
}


export interface ButtonProps
{
    onClick: () => void;
}

export interface SnackbarProps
{
    open: boolean;
}


interface Snackbar
{
    open: boolean;
    setOpen: (open: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
}


export function NextButton<a>(
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
                onClick={() => props.value0.onClick()(props.dispatch)}
            />
            <props.successSnackbar
                open={successSnackbar.open}
            />
            <props.errorSnackbar
                open={errorSnackbar.open}
            />
        </props.container>
    );
}


function getSnackbar(): Snackbar
{
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    return {
        open,
        setOpen,
        message,
        setMessage,
    };
}
