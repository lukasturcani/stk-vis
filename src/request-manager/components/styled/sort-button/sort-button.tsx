import * as React from 'react';
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';
import Grid from '@material-ui/core/Grid';
import {
    SortButton as SortButtonBase,
    ButtonProps,
} from 'request-manager/base/sort-button';
import {
    CoreProps
} from 'request-manager/base/sort-button/sort-button';
import {
    SortSettings,
} from 'request-manager/styled/sort-button/sort-settings';


export const SortButton: React.FunctionComponent<CoreProps>
    = (props) => <SortButtonBase
        container={Container}
        button={StyledButton}
        {...props}
        sortSettings={SortSettings}
    />;

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
