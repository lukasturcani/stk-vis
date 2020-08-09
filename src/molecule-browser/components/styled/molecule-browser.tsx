import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import {
    MoleculeBrowser as MoleculeBrowserBase,
    CoreProps,
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


export function MoleculeBrowser<a>(
    props: CoreProps<a>,
)
{
    return <MoleculeBrowserBase
        root={Root}
        sortButton={SortButton}
        moleculeTable={MoleculeTable}
        viewerContainer={ViewerContainer}
        twoDViewer={TwoDViewer}
        threeDViewer={ThreeDViewer}
        navigationButtonContainer={NavigationButtonContainer}
        backButton={BackButton}
        nextButton={NextButton}
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


type Empty = Record<string, unknown>;
const NavigationButtonContainer: React.FunctionComponent<Empty>
    = (props) => (
        <Grid item
            xs={12}
        >
            <Grid container
                spacing={3}
                justify={ 'center' }
            >
                {props.children}
            </Grid>
        </Grid>
    );
