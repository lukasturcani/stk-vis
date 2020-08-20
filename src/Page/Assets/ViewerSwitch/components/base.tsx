import * as React from 'react';
import {
    Props as ViewerSwitchProps,
} from 'Page.ViewerSwitch';

type Empty = Record<string, unknown>;

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export type CoreProps<a> = DispatchProps<a> & ViewerSwitchProps<a>;

interface Props<a> extends ViewerSwitchProps<a>, DispatchProps<a>
{
    switchComponent: React.FunctionComponent<SwitchProps>;
}

export interface SwitchProps
{
    checked: boolean;
    onChange: (event: any) => void;
    label: string;
}


export function ViewerSwitch<a>(
    props: Props<a>,
)
{
    return <props.switchComponent
        label={props.label}
        checked={props.state}
        onChange={
            (event: any) =>
                props.setState(props.dispatch)(event.target.checked)
        }
    />
}
