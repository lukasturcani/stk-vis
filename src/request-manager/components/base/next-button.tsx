import * as React from 'react';
import{
    NextButtonProps,
} from 'RequestManager.RequestManager'
import {
    RequestResult,
} from 'RequestManager.RequestResult';

export interface DispatchProps
{
    handleResult: (result: RequestResult) => void;
}

interface Props extends NextButtonProps, DispatchProps
{
    button: React.FunctionComponent<ButtonProps>;
}


export interface ButtonProps
{
    onClick: () => void;
}


export function NextButton(
    props: Props,
)
{
    return <props.button
        onClick={
            () => props.value0.request.then(props.handleResult)
        }
    />;
}
