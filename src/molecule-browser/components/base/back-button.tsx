import * as React from 'react';
import {
    BackButtonProps
} from 'MoleculeBrowser.MoleculeBrowser'


interface Props extends BackButtonProps
{
    button: React.FunctionComponent<ButtonProps>;
}

export interface ButtonProps
{
    disabled: boolean;
}


export function BackButton(
    props: Props,
)
{
    return <props.button
        disabled={props.value0.disabled}
    />;
}
