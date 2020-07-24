import * as React from 'react';
import {
    SortButtonProps
} from 'RequestManager.RequestManager';


interface Props extends SortButtonProps
{
    button: React.FunctionComponent<ButtonProps>;
}


export interface ButtonProps
{
}


export function SortButton(
    props: Props,
)
{
    return <props.button
    />;
}
