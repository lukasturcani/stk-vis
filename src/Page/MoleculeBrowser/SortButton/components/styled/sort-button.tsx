import * as React from 'react';
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';
import Grid from '@material-ui/core/Grid';
import {
    SortButton as SortButtonBase,
    ButtonProps,
} from '../base/sort-button';
import {
    CoreProps
} from '../base/sort-button';
import {
    SortSettings,
} from '../styled/sort-settings';


export function SortButton<a>(
    props: CoreProps<a>,
)
{
    return <SortButtonBase
        container={Container}
        button={StyledButton}
        {...props}
        sortSettings={SortSettings}
    />;
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


const StyledButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Button
            variant={ 'contained' }
            color={ 'secondary' }
            {...props}
        >
            <SortIcon />
        </Button>
    );
