import * as React from 'react';
import {
    DispatchProps as ConfiguratorDispatchProps,
} from 'mongo-configurator/base/mongo-configurator';
import {
    Props as BaseProps,
} from 'StkVis.StkVis';


export type DispatchProps =
    & ConfiguratorDispatchProps


interface Props extends BaseProps, DispatchProps
{
}


export function StkVis(
    props: Props,
)
{
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                backgroundColor: 'red',
            }}
        >
        </div>
    );
}
