import * as React from 'react';
import {
    StkVis as StkVisBase,
    BaseProps,
} from 'stk-vis/components/stk-vis';


export function StkVis(
    props: BaseProps,
)
{
    return <StkVisBase
        {...props}
    />;
}
