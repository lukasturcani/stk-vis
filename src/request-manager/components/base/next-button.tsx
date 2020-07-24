import * as React from 'react';
import{
    NextButtonProps,
} from 'RequestManager.RequestManager'


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
