import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialBreadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SettingsIcon from '@material-ui/icons/Settings';
import Link from '@material-ui/core/Link';
import TableChartIcon from '@material-ui/icons/TableChart';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import BaseSnackbar from '@material-ui/core/Snackbar'
import {
    Breadcrumbs as BreadcrumbsBase,
    LinkProps,
    CoreProps,
    SnackbarProps,
} from '../base/breadcrumbs';


export function Breadcrumbs<a>(
    props: CoreProps<a>,
)
{
    return (
        <BreadcrumbsBase
            container={Container}
            breadcrumbsComponent={StyledBreadcrumbs}
            configuratorLink={ConfiguratorLink}
            resultsLink={ResultsLink}
            currentLink={CurrentLink}
            historyLink={HistoryLink}
            snackbar={Snackbar}
            {...props}
        />
    );
}

type Empty = Record<string, unknown>;

const Container: React.FunctionComponent<Empty>
    = (props) => (
        <Grid item
            xs={12}
        >
            {props.children}
        </Grid>
    );

const StyledBreadcrumbs: React.FunctionComponent<Empty>
    = (props) => (
        <MaterialBreadcrumbs
            separator={
                <NavigateNextIcon
                    style={{
                        verticalAlign: 'middle',
                        width: 30,
                        height: 30,
                    }}
                />
            }
        >
            {props.children}
        </MaterialBreadcrumbs>
    );

const ConfiguratorLink: React.FunctionComponent<LinkProps>
    = props => (
        <Link
            color='inherit'
            component='button'
            variant='h5'
            {...props}
        >
            <SettingsIcon
                style={{
                    marginRight: '0.2em',
                    verticalAlign: 'middle',
                    width: 30,
                    height: 30,
                }}
            />
            <span style={{ verticalAlign: 'middle'}} >MongoDB</span>
        </Link>
    );

const ResultsLink: React.FunctionComponent<LinkProps>
    = props => (
        <Link
            color='inherit'
            component='button'
            variant='h5'
            {...props}
        >
            <TableChartIcon
                style={{
                    marginRight: '0.2em',
                    verticalAlign: 'middle',
                    width: 30,
                    height: 30,
                }}
            />
            <span style={{ verticalAlign: 'middle' }} >Results</span>
        </Link>
    );

const HistoryLink: React.FunctionComponent<LinkProps>
    = props => (
        <Link
            color='inherit'
            component='button'
            variant='h5'
            {...props}
        >
            <ZoomInIcon
                style={{
                    verticalAlign: 'middle',
                    width: 30,
                    height: 30,
                }}
            />
        </Link>
    );

const CurrentLink: React.FunctionComponent<Empty>
    = props => (
        <Link
            color='inherit'
            component='button'
            variant='h5'
            {...props}
        >
            <ZoomInIcon
                style={{
                    verticalAlign: 'middle',
                    width: 30,
                    height: 30,
                }}
            />
        </Link>
    );

const Snackbar: React.FunctionComponent<SnackbarProps>
    = props => (
        <BaseSnackbar
            open={props.open}
            onClose={props.onClose}
            autoHideDuration={6000}
        >
            <Alert
                severity='error'
                onClose={props.onClose}
            >
                {props.message}
            </Alert>
        </BaseSnackbar>
    );


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
