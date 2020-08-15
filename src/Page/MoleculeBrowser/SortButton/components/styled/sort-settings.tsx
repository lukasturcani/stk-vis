import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    SortSettings as SortSettingsBase,
    CoreProps,
} from '../base/sort-settings';
import {
    Form,
} from '../styled/form';
import {
    SubmitButton,
} from '../styled/submit-button';


export function SortSettings<a>(
    props: CoreProps<a>,
)
{
    return <SortSettingsBase
        dialog={Dialog}
        container={Container}
        form={Form}
        submitButton={SubmitButton}
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
