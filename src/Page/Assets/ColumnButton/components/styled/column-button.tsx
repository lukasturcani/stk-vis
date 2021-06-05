
import * as React from 'react';
import Button from '@material-ui/core/Button';
import ColumnIcon from '@material-ui/icons/ViewColumn';
import Grid from '@material-ui/core/Grid';
import {
    ColumnButton as ColumnButtonBase,
    ButtonProps,
} from '../base/column-button';
import {
    CoreProps
} from '../base/column-button';
import {
    ColumnSettings,
} from '../styled/column-settings';


export function ColumnButton<a>(
    props: CoreProps<a>,
)
{
    return <ColumnButtonBase
        container={Container}
        button={StyledButton}
        columnSettings={ColumnSettings}
        {...props}
    />;
}

type Empty = Record<string, unknown>;

const Container: React.FunctionComponent<Empty>
    = (props) => (
        <Grid item>
            {props.children}
        </Grid>
    );


const StyledButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Button
            variant={ 'contained' }
            color={ 'secondary' }
            startIcon={<ColumnIcon />}
            {...props}
        >
            <span
                style={{ verticalAlign: 'middle' }}
            >
                Columns
            </span>
        </Button>
    );
