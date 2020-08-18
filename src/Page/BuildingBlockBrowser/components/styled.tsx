import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import {
    MoleculeBrowser as MoleculeBrowserBase,
    CoreProps,
} from './base';

import {
    MoleculeTable,
} from '../../MoleculeBrowser/MoleculeTable/components/styled';
import {
    TwoDViewer,
} from '../../MoleculeBrowser/TwoDViewer/components/styled';
import {
    ThreeDViewer,
} from '../../MoleculeBrowser/ThreeDViewer/components/styled';


export function BuildingBlockBrowser<a>(
    props: CoreProps<a>,
)
{
    return <MoleculeBrowserBase
        root={Root}
        moleculeTableComponent={MoleculeTable}
        viewerContainer={ViewerContainer}
        twoDViewerComponent={TwoDViewer}
        threeDViewerComponent={ThreeDViewer}
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

const ViewerContainer: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <Grid item
            xs={6}
            style={{
                height: '83%',
            }}
        >
            <Grid container
                style={ {
                    height: '100%',
                    width: '100%',
                } }
                alignItems='center'
                justify='center'
                direction='row'
            >
                {props.children}
            </Grid>
        </Grid>
    );
