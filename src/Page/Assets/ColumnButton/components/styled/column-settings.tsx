import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    ColumnSettings as ColumnSettingsBase,
    CoreProps,
} from '../base/column-settings';
import {
    Form,
} from '../styled/form';


export function ColumnSettings<a>(
    props: CoreProps<a>,
)
{
    return <ColumnSettingsBase
        dialog={Dialog}
        container={Container}
        form={Form}
        {...props}
    />;
}

type Empty = Record<string, unknown>;
const Container: React.FunctionComponent<Empty>
    = (props) => (
        <Paper
            style={{
                padding: '30px',
            }}
        >
            <Grid container
                spacing={3}
                alignItems={'center'}
                alignContent={'center'}
                justify={'center'}
            >
                {props.children}
            </Grid>
        </Paper>
    );
