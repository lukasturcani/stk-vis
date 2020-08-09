import * as React from 'react';
import {
    StkVis as StkVisBase,
    CoreProps,
} from 'stk-vis/base/stk-vis';
import {
    MongoConfigurator,
} from 'mongo-configurator/styled/mongo-configurator';
import {
    MoleculeBrowser,
} from 'molecule-browser/styled/molecule-browser';


export function StkVis<a>(
    props: CoreProps<a>
)
{
    return <StkVisBase
        mongoConfigurator={MongoConfigurator}
        moleculeBrowser={MoleculeBrowser}
        {...props}
    />;
}
