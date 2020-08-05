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

export type CoreProps = DispatchProps & BackButtonProps;

interface Props extends BackButtonProps, DispatchProps
{
    button: React.FunctionComponent<ButtonProps>;
}

export interface ButtonProps
{
    disabled: boolean;
    onClick: () => void;
}


export function BackButton(
    props: Props,
)
{
    return <props.button
        onClick={
            () => props.value0.request().then(props.handleResult)
        }
        disabled={props.value0.disabled}
    />;
}
