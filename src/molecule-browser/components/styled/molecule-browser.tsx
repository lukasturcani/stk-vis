import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import {
    MoleculeBrowserProps,
} from 'MoleculeBrowser.MoleculeBrowser'
import {
    MoleculeBrowser as MoleculeBrowserBase
} from 'molecule-browser/base/molecule-browser';

import {
    SortButton,
} from 'request-manager/styled/sort-button';
import {
    MoleculeTable,
} from 'molecules/styled/molecule-table';
import {
    TwoDViewer,
} from 'molecules/styled/2d-viewer';
import {
    ThreeDViewer,
} from 'molecules/styled/3d-viewer';
import {
    BackButton,
} from 'request-manager/styled/back-button';
import {
    NextButton,
} from 'request-manager/styled/next-button';


export function MoleculeBrowser(
    props: MoleculeBrowserProps,
)
{
    return <MoleculeBrowserBase
        root={Root}
        sortButton={SortButton}
        moleculeTable={MoleculeTable}
        viewerContainer={ViewerContainer}
        twoDViewer={TwoDViewer}
        threeDViewer={ThreeDViewer}
        backButton={BackButton}
        nextButton={NextButton}
        {...props}
    />;
}


const Root: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <Grid container
            style={{
                height: '100%',
                width: '100%',
            }}
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
