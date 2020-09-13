import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import {
    MoleculeBrowser as MoleculeBrowserBase,
    CoreProps,
} from '../../base/browser/all-viewers';
import {
    Breadcrumbs
} from '../breadcrumbs';

import {
    MoleculeTable,
} from '../../../../Assets/MoleculeTable/components/styled/half';
import {
    TwoDViewer,
} from '../../../../Assets/TwoDViewer/components/styled/half';
import {
    ThreeDViewer,
} from '../../../../Assets/ThreeDViewer/components/styled/half';
import {
    ViewerSwitch,
} from '../../../../Assets/ViewerSwitch/components/styled';
import {
    SaveButton,
} from '../../../../Assets/SaveButton/components/styled/save-button';


export function BuildingBlockBrowser<a>(
    props: CoreProps<a>,
)
{
    return <MoleculeBrowserBase
        root={Root}
        breadcrumbsComponent={Breadcrumbs}
        configContainer={ConfigContainer}
        viewerSwitchComponent={ViewerSwitch}
        saveButtonComponent={SaveButton}
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
