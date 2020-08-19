import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialBreadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SettingsIcon from '@material-ui/icons/Settings';
import Link from '@material-ui/core/Link';
import TableChartIcon from '@material-ui/icons/TableChart';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import {
    Breadcrumbs as BreadcrumbsBase,
    LinkProps,
    CoreProps,
} from '../base/breadcrumbs';
import { theme } from '../../../../theme';

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
                        marginRight: theme.spacing(0.5),
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
                    marginRight: theme.spacing(0.5),
                    width: 30,
                    height: 30,
                }}
            />
            MongoDB
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
                    marginRight: theme.spacing(0.5),
                    width: 30,
                    height: 30,
                }}
            />
            Results
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
                    marginRight: theme.spacing(0.5),
                    width: 30,
                    height: 30,
                }}
            />
        </Link>
    );
