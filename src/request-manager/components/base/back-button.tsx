import * as React from 'react';
import {
    BackButtonProps
} from 'RequestManager.RequestManager'
import {
    RequestResult,
} from 'RequestManager.RequestResult';


export interface DispatchProps
{
    handleResult: (result: RequestResult) => void;
}

export type CoreProps<a> = DispatchProps & BackButtonProps<a>;

interface Props<a> extends BackButtonProps<a>, DispatchProps
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
        onClick={
            () => props.value0.request().then(props.handleResult)
        }
        disabled={props.value0.disabled}
    />;
}
