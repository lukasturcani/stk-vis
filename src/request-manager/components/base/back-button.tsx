import * as React from 'react';
import {
    BackButtonProps
} from 'RequestManager.RequestManager'
import {
    RequestResult,
} from 'RequestManager.RequestResult';


export interface DispatchProps<a>
{
    dispatch: (action: a) => void
}

export type CoreProps<a> = DispatchProps<a> & BackButtonProps<a>;

interface Props<a> extends BackButtonProps<a>, DispatchProps<a>
{
    button: React.FunctionComponent<ButtonProps>;
}

export interface ButtonProps
{
    disabled: boolean;
    onClick: () => void;
}


export function BackButton<a>(
    props: Props<a>,
)
{
    return <props.button
        onClick={() => props.value0.onClick()(props.dispatch)}
        disabled={props.value0.disabled}
    />;
}
