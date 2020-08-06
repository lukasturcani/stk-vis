import * as React from 'react';
import {
    DispatchProps as ConfiguratorDispatchProps,
} from 'mongo-configurator/base/mongo-configurator';
import {
    Props as ConfiguratorBaseProps,
} from 'MongoConfigurator.MongoConfigurator';
import {
    Props as BaseProps,
} from 'StkVis.StkVis';


export interface DispatchProps
{
    dispatch: ConfiguratorDispatchProps;
}


interface Props<a> extends BaseProps<a>, DispatchProps
{
    mongoConfigurator: React.FunctionComponent<ConfiguratorProps>
}

type ConfiguratorProps
    = ConfiguratorBaseProps & ConfiguratorDispatchProps


export function StkVis<a>(
    props: Props<a>,
)
{
    if (props.value0 !== undefined)
    {
        return <props.mongoConfigurator
            {...props.value0}
            {...props.dispatch}
        />;
    }
    return <div>YOU SHOULD NEVER SEE THIS!!</div>;
}
