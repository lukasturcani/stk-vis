import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import {
    MoleculeBrowser as MoleculeBrowserBase,
    CoreProps,
} from '../base/molecule-browser';

import {
    SortButton,
} from '../../../SortButton/components/styled/sort-button';


export function MoleculeBrowser<a>(
    props: CoreProps<a>,
)
{
    return <MoleculeBrowserBase
        root={Root}
        sortButtonComponent={SortButton}
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
