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
    onClick: () => void;
}


export function NextButton(
    props: Props,
)
{
    return <props.button
        onClick={
            () => props.value0.request.then(props.value0.handleResult)
        }
    />;
}
