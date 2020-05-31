import * as React from 'react';
import { connect } from 'react-redux';
import {
    getPageKind,
} from '../../../selectors';
import { MoleculeTableComponent } from '../MoleculeTable';
import {
    DatabaseBrowserKind,
    ILoadedDatabaseBrowser,
    PageKind,
} from '../../../models';
import {
    MoleculeRequestButtonComponent
} from '../MoleculeRequestButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Settings from '@material-ui/icons/Settings';
import TableChart from '@material-ui/icons/TableChart';
import {
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import { theme } from './theme';



interface ILoadedDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Loaded;
    pageKind: PageKind;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  }),
);




function LoadedDatabaseBrowser(props: ILoadedDatabaseBrowserProps)
{
    const classes = useStyles(theme);
    return (
        <Container><Grid container
            style={{height: '100%'}}
            spacing={3}
        >
            <Grid item xs={ 12 }>
                <Breadcrumbs
                    separator={
                        <NavigateNextIcon className={ 'mine' } />
                    }
                >
                    <Link color='inherit' href='/mongo-db' >
                        <Settings className={ classes.icon } />
                        MongoDB
                    </Link>
                    <Typography color='inherit'>
                        <TableChart className={ classes.icon } />
                        Results
                    </Typography>
                </Breadcrumbs>
            </Grid>
            <Grid
                item xs={12}
                style={ {height: '95%', overflow: 'auto'} }
            >
                <MoleculeTableComponent />
            </Grid>
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
        </Grid></Container>
    );
}


function mapStateToProps(
    state: ILoadedDatabaseBrowser
)
    : ILoadedDatabaseBrowserProps
{
    return {
        kind:
            DatabaseBrowserKind.Loaded,

        pageKind:
            getPageKind(state),

    };
}


export const LoadedDatabaseBrowserComponent
    = connect(mapStateToProps)(LoadedDatabaseBrowser)
