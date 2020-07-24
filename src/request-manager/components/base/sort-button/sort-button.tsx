import * as React from 'react';
import {
    SortButtonProps
} from 'RequestManager.RequestManager';
import {
    BaseProps as SortSettingsProps,
} from './sort-settings';


type Empty = Record<string, unknown>;

interface Props extends SortButtonProps
{
    container: React.FunctionComponent<Empty>;
    button: React.FunctionComponent<ButtonProps>;
    sortSettings: React.FunctionComponent<SortSettingsProps>;
}


export interface ButtonProps
{
    onClick: () => void;
}


export function SortButton(
    props: Props,
)
{
    const [open, setOpen] =  React.useState(false);
    return (
        <props.container>
            <props.button
                onClick={ () => setOpen(true) }
            />
            <props.sortSettings
                open={open}
                setOpen={setOpen}
                collections={props.value0.collections}
            />
        </props.container>
    );
}
