import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialBreadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SettingsIcon from '@material-ui/icons/Settings';
import Link from '@material-ui/core/Link';
import TableChartIcon from '@material-ui/icons/TableChart';
import {
    Breadcrumbs as BreadcrumbsBase,
    ConfiguratorLinkProps,
    CoreProps,
} from './base';


export function Breadcrumbs<a>(
    props: CoreProps<a>,
)
{
    return (
        <BreadcrumbsBase
            container={Container}
            breadcrumbsComponent={StyledBreadcrumbs}
            configuratorLink={ConfiguratorLink}
            browserLink={BrowserLink}
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
                        width: 30,
                        height: 30,
                        verticalAlign: 'middle',
                    }}
                />
            }
        >
            {props.children}
        </MaterialBreadcrumbs>
    );

const ConfiguratorLink: React.FunctionComponent<ConfiguratorLinkProps>
    = props => (
        <Link
            color='inherit'
            component='button'
            variant='h5'
            {...props}
        >
            <SettingsIcon
                style={{
                    width: 30,
                    height: 30,
                    verticalAlign: 'middle',
                    marginRight: '0.2em',
                }}
            />
            <span style={{ verticalAlign: 'middle'}} >MongoDB</span>
        </Link>
    );

const BrowserLink: React.FunctionComponent<Empty>
    = props => (
        <Link
            color='inherit'
            component='button'
            variant='h5'
            {...props}
        >
            <TableChartIcon
                style={{
                    width: 30,
                    height: 30,
                    verticalAlign: 'middle',
                    marginRight: '0.3em',
                }}
            />
            <span style={{ verticalAlign: 'middle' }} >Results</span>
        </Link>
    );
