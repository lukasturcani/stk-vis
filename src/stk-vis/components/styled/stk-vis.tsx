import * as React from 'react';
import {
    StkVis as StkVisBase,
    DispatchProps,
} from 'stk-vis/base/stk-vis';
import {
    Props as BaseProps,
} from 'StkVis.StkVis';
import {
    MongoConfigurator,
} from 'mongo-configurator/styled/mongo-configurator';


export function StkVis(
    props: BaseProps & DispatchProps,
)
{
    return <StkVisBase
        mongoConfigurator={MongoConfigurator}
        {...props}
    />;
}
