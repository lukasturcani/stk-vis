import * as React from 'react';
import {
    StkVis as StkVisBase,
    BaseProps,
    DispatchProps,
} from 'stk-vis/components/stk-vis';


export function StkVis(
    props: BaseProps & DispatchProps,
)
{
    return <StkVisBase
        {...props}
    />;
}
