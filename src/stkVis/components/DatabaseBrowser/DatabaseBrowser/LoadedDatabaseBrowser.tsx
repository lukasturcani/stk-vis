import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import {
    getPageKind,
} from '../../../selectors';
import { MoleculeTableComponent } from '../MoleculeTable';
import {
    DatabaseBrowserKind,
    ILoadedDatabaseBrowser,
    PageKind,
} from '../../../models';
import { setInitialBrowserState } from '../../../actions';
import {
    MoleculeRequestButtonComponent
} from '../MoleculeRequestButton';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Paper from '@material-ui/core/Paper';
import Settings from '@material-ui/icons/Settings';
import TableChart from '@material-ui/icons/TableChart';
import {
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import { theme } from './theme';
import { SortButtonComponent } from '../SortButton';
import { ThreeDViewerComponent } from '../ThreeDViewer';
import { TwoDViewerComponent } from '../TwoDViewer';



interface ILoadedDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Loaded;
    pageKind: PageKind;
    dispatchSetInitialBrowserState: () => void;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(0.5),
      width: 30,
      height: 30,
    },
  }),
);




function LoadedDatabaseBrowser(props: ILoadedDatabaseBrowserProps)
{
    const classes = useStyles(theme);
    return (
        <Grid container
            style={ {
                height: '98vh',
                width: '98vw',
                margin: 0,
                padding: 10,
            } }
            spacing={3}
            alignItems='center'
            justify='center'
            direction='row'
        >
            <Grid item xs={ 12 }>
                <Breadcrumbs
                    separator={
                        <NavigateNextIcon className={ classes.icon } />
                    }
                >
                    <Link
                        color='inherit'
                        component='button'
                        variant='h5'
                        onClick={
                            props.dispatchSetInitialBrowserState
                        }
                    >
                        <Settings className={ classes.icon } />
                        MongoDB
                    </Link>
                    <Link
                        color='inherit'
                        component='button'
                        variant='h5'
                    >
                        <TableChart className={ classes.icon } />
                        Results
                    </Link>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <SortButtonComponent />
            </Grid>
            <Grid
                item xs={6}
                style={ { height: '83%' } }
            >
                <MoleculeTableComponent />
            </Grid>
            <Grid item
                xs={6}
                style={ { height: '83%' } }
            ><Grid container
                style={ {
                    height: '100%',
                    width: '100%',
                } }
                alignItems='center'
                justify='center'
                direction='row'
            >
                <Box
                    paddingBottom={1.5}
                    style={ {
                        height: '50%',
                        width: '100%',
                    } }
                ><Grid
                    item xs={12}
                    style={ { height: '100%'  } }
                >
                    <Paper style={{
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden',
                    }}>
                        <TwoDViewerComponent />
                    </Paper>
                </Grid></Box>
                <Box
                    paddingTop={1.5}
                    style={ {
                        height: '50%',
                        width: '100%',
                    } }
                ><Grid
                    item xs={12}
                    style={ { height: '100%'  } }
                >
                    <Paper style={{
                        height: '100%',
                        overflow: 'auto',
                    }}>
                        <ThreeDViewerComponent />
                    </Paper>
                </Grid></Box>
            </Grid></Grid>
            <Grid item
                xs={12}
            ><Grid container
                spacing={ 3 }
                justify={ 'flex-end' }
            >
            {
                !(
                    props.pageKind === PageKind.First
                    ||
                    props.pageKind === PageKind.OnlyComplete
                    ||
                    props.pageKind === PageKind.OnlyIncomplete
                )
                &&
                <Grid item><MoleculeRequestButtonComponent
                    isForward={ false }
                /></Grid>
            }
            <Grid item>
                <MoleculeRequestButtonComponent isForward={ true } />
            </Grid>
            </Grid></Grid>
        </Grid>
    );
}


function mapStateToProps(
    state: ILoadedDatabaseBrowser
)
    : { kind: DatabaseBrowserKind.Loaded, pageKind: PageKind }
{
    return {
        kind:
            DatabaseBrowserKind.Loaded,

        pageKind:
            getPageKind(state),

    };
}


function mapDispatchToProps(
    dispatch: (action: AnyAction) => void,
)
{
    return {
        dispatchSetInitialBrowserState: (): void => {
            dispatch(setInitialBrowserState());
        },
    };
}


export const LoadedDatabaseBrowserComponent
    = connect
        (mapStateToProps, mapDispatchToProps)(LoadedDatabaseBrowser)
