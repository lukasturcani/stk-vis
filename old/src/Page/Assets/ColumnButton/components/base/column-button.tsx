import * as React from 'react';
import {
    Props as ColumnButtonProps
} from 'Page.ColumnButton';
import {
    CoreProps as ColumnSettingsProps,
} from './column-settings';


type Empty = Record<string, unknown>;

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export type CoreProps<a> = ColumnButtonProps<a> & DispatchProps<a>;

interface Props<a> extends ColumnButtonProps<a>, DispatchProps<a>
{
    container: React.FunctionComponent<Empty>;
    button: React.FunctionComponent<ButtonProps>;
    columnSettings: React.FunctionComponent<ColumnSettingsProps<a>>;
}

export interface SnackbarProps
{
    open: boolean;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
    message: string;
}


export interface ButtonProps
{
    onClick: () => void;
}


export function ColumnButton<a>(
    props: Props<a>,
)
{
    const [open, setOpen] =  React.useState(false);

    return (
        <props.container>
            <props.button
                onClick={ () => setOpen(true) }
            />
            <props.columnSettings
                dispatch={props.dispatch}
                open={open}
                setOpen={setOpen}
                collections={props.collections}
                hideCollection={props.hideCollection}
                showCollection={props.showCollection}
            />
        </props.container>
    );
}
