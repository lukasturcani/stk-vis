import * as React from 'react';
import {
    CoreProps as ConfiguratorProps
} from 'mongo-configurator/base/mongo-configurator';
import {
    CoreProps as BrowserProps
} from 'molecule-browser/base/molecule-browser';
import {
    Props as BaseProps,
} from 'StkVis.StkVis';


export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export type CoreProps<a> = BaseProps<a> & DispatchProps<a>;


interface Props<a> extends BaseProps<a>, DispatchProps<a>
{
    mongoConfigurator: React.FunctionComponent<ConfiguratorProps<a>>;
    moleculeBrowser: React.FunctionComponent<BrowserProps<a>>;
}

export function StkVis<a>(
    props: Props<a>,
)
{
    if (props.value0 === "Mongo Configurator")
    {
        return <props.mongoConfigurator
            dispatch={props.dispatch}
            {...props.value1}
        />;
    }
    if (props.value0 === "Molecule Browser")
    {
        return <props.moleculeBrowser
            dispatch={props.dispatch}
            value0={props.value1.value0}
        />;
    }
    return <div>YOU SHOULD NEVER SEE THIS!!</div>;
}
