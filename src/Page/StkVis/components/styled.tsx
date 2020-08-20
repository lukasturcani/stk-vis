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
    BuildingBlockBrowser as BBAllViewers
} from '../../BuildingBlockBrowser/components/styled/browser/all-viewers';
import {
    BuildingBlockBrowser as BBTwoDViewer
} from '../../BuildingBlockBrowser/components/styled/browser/2d-viewer';


export function StkVis(
    props: CoreProps
)
{
    return <StkVisBase
        mongoConfigurator={MongoConfigurator}
        moleculeBrowser={MoleculeBrowser}
        bbAllViewers={BBAllViewers}
        bbTwoDViewer={BBTwoDViewer}
        {...props}
    />;
}
