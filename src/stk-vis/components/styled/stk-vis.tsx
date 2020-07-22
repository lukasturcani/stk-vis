import * as React from 'react';
import {
    StkVis as StkVisBase,
    BaseProps,
    DispatchProps,
} from 'stk-vis/base/stk-vis';


export function StkVis(
    // Can't figure out how to type this without typescript throwing
    // a fit unfortunately.
    // props: BaseProps & DispatchProps
    props: any
)
{
    return <StkVisBase
        {...props}
    />;
}
