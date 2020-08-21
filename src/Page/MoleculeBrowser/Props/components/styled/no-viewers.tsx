import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import {
    MoleculeBrowser as MoleculeBrowserBase,
    CoreProps,
} from '../base/no-viewers';

import {
    SortButton,
} from '../../../SortButton/components/styled/sort-button';
import {
    MoleculeTable,
} from '../../../../Assets/MoleculeTable/components/styled/full';
import {
    ViewerSwitch,
} from '../../../../Assets/ViewerSwitch/components/styled';
import {
    NextButton,
} from '../../../NextButton/components/styled';
import {
    BackButton,
} from '../../../BackButton/components/styled';
import {
    Breadcrumbs,
} from '../../../Breadcrumbs/components/styled';


export function MoleculeBrowser<a>(
    props: CoreProps<a>,
)
{
    return <MoleculeBrowserBase
        root={Root}
        breadcrumbsComponent={Breadcrumbs}
        configContainer={ConfigContainer}
        viewerSwitchComponent={ViewerSwitch}
        sortButtonComponent={SortButton}
        moleculeTableComponent={MoleculeTable}
        navigationButtonContainer={NavigationButtonContainer}
        nextButtonComponent={NextButton}
        backButtonComponent={BackButton}
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
