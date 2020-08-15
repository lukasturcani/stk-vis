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
            />
        </props.container>
    );
}
