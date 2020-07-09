import * as React from 'react';
import { connect } from 'react-redux';
import {
    DatabaseBrowserKind,
    IInitialDatabaseBrowser,
} from '../../../models';
import {
    MoleculeRequestButtonComponent
} from '../MoleculeRequestButton';
import { MongoDbFieldsComponent } from '../MongoDbFields';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Settings from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import { theme } from './theme';
import Paper from '@material-ui/core/Paper';


interface IInitialDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Initial;
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


function InitialDatabaseBrowser(props: IInitialDatabaseBrowserProps)
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
                        <NavigateNextIcon className={ classes.icon } />
                    }
                >
                    <Link
                        color='inherit'
                        component='button'
                        variant='h5'
                    >
                        <Settings className={ classes.icon } />
                        MongoDB
                    </Link>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={ 12 }>
                <Paper><MongoDbFieldsComponent /></Paper>
            </Grid>
        </Grid>
        </Container>
    );
}


function mapStateToProps(
    state: IInitialDatabaseBrowser
)
    : IInitialDatabaseBrowserProps
{
    return {
        kind:
            DatabaseBrowserKind.Initial,
    };
}


export const InitialDatabaseBrowserComponent
    = connect(mapStateToProps)(InitialDatabaseBrowser)
