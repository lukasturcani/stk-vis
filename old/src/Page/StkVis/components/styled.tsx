import * as React from 'react';
import {
    StkVis as StkVisBase,
    CoreProps,
} from './base';
import {
    MongoConfigurator,
} from '../../MongoConfigurator/components/styled/mongo-configurator';
import {
    MoleculeBrowser as MolAllViewers
} from '../../MoleculeBrowser/Props/components/styled/all-viewers';
import {
    MoleculeBrowser as MolThreeDViewer
} from '../../MoleculeBrowser/Props/components/styled/3d-viewer';
import {
    MoleculeBrowser as MolTwoDViewer
} from '../../MoleculeBrowser/Props/components/styled/2d-viewer';
import {
    MoleculeBrowser as MolNoViewers
} from '../../MoleculeBrowser/Props/components/styled/no-viewers';
import {
    BuildingBlockBrowser as BBAllViewers
} from '../../BuildingBlockBrowser/components/styled/browser/all-viewers';
import {
    BuildingBlockBrowser as BBTwoDViewer
} from '../../BuildingBlockBrowser/components/styled/browser/2d-viewer';
import {
    BuildingBlockBrowser as BBThreeDViewer
} from '../../BuildingBlockBrowser/components/styled/browser/3d-viewer';
import {
    BuildingBlockBrowser as BBNoViewers
} from '../../BuildingBlockBrowser/components/styled/browser/no-viewers';


export function StkVis(
    props: CoreProps
)
{
    return <StkVisBase
        mongoConfigurator={MongoConfigurator}
        molAllViewers={MolAllViewers}
        molTwoDViewer={MolTwoDViewer}
        molThreeDViewer={MolThreeDViewer}
        molNoViewers={MolNoViewers}
        bbAllViewers={BBAllViewers}
        bbTwoDViewer={BBTwoDViewer}
        bbThreeDViewer={BBThreeDViewer}
        bbNoViewers={BBNoViewers}
        {...props}
    />;
}
