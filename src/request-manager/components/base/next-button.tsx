import * as React from 'react';
import{
    NextButtonProps,
} from 'RequestManager.RequestManager'

export interface DispatchProps<a>
{
    dispatch: (action: a) => void
}

export type CoreProps<a> = DispatchProps<a> & NextButtonProps<a>;

interface Props<a> extends NextButtonProps<a>, DispatchProps<a>
{
    button: React.FunctionComponent<ButtonProps>;
}


export interface ButtonProps
{
    onClick: () => void;
}


export function NextButton<a>(
    props: Props<a>,
)
{
    return <props.button
        onClick={() => props.value0.onClick()(props.dispatch)}
    />;
}
