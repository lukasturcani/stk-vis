import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import {
    MoleculeBrowser as MoleculeBrowserBase,
    CoreProps,
} from '../../base/browser/no-viewers';
import {
    Breadcrumbs
} from '../breadcrumbs';

import {
    MoleculeTable,
} from '../../../../Assets/MoleculeTable/components/styled/full';
import {
    ViewerSwitch,
} from '../../../../Assets/ViewerSwitch/components/styled';


export function BuildingBlockBrowser<a>(
    props: CoreProps<a>,
)
{
    return <MoleculeBrowserBase
        root={Root}
        breadcrumbsComponent={Breadcrumbs}
        configContainer={ConfigContainer}
        moleculeTableComponent={MoleculeTable}
        viewerSwitchComponent={ViewerSwitch}
        {...props}
    />;
}


const Root: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <Grid container
            style={ {
                height: '100vh',
                width: '100vw',
                margin: 0,
                padding: 10,
            } }
            spacing={3}
            alignItems='center'
            justify='center'
            direction='row'
        >
            {props.children}
        </Grid>
    );

type Empty = Record<string, unknown>;

const ConfigContainer: React.FunctionComponent<Empty>
    = (props) => (
        <Grid item
            xs={12}
        >
            <Grid container
                spacing={3}
                justify={ 'flex-start' }
            >
                {props.children}
            </Grid>
        </Grid>
    );
