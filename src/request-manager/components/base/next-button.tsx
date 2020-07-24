import * as React from 'react';
import{
    NextButtonProps,
} from 'MoleculeBrowser.MoleculeBrowser'


interface Props extends NextButtonProps
{
    button: React.FunctionComponent<ButtonProps>;
}


export interface ButtonProps
{
}


export function NextButton(
    props: Props,
)
{
    return <props.button
    />;
}
