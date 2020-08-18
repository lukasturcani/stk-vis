import * as React from 'react';
import {
    StkVis as StkVisBase,
    CoreProps,
} from './base';
import {
    MongoConfigurator,
} from '../../MongoConfigurator/components/styled/mongo-configurator';
import {
    MoleculeBrowser,
} from '../../MoleculeBrowser/Props/components/styled';
import {
    BuildingBlockBrowser
} from '../../BuildingBlockBrowser/components/styled';


export function StkVis(
    props: CoreProps
)
{
    return <StkVisBase
        mongoConfigurator={MongoConfigurator}
        moleculeBrowser={MoleculeBrowser}
        buildingBlockBrowser={BuildingBlockBrowser}
        {...props}
    />;
}
