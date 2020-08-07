import * as React from 'react';
import {
    SortButtonProps
} from 'RequestManager.RequestManager';
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
                setUnsorted={props.value0.setUnsorted}
                setSorted={props.value0.setSorted}
                updateMoleculePage={props.value0.updateMoleculePage}
                open={open}
                setOpen={setOpen}
                collections={props.value0.collections}
            />
        </props.container>
    );
}
