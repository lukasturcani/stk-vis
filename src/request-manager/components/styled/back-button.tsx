import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {
    BackButton as BackButtonBase,
    CoreProps,
    ButtonProps,
} from 'request-manager/base/back-button';

export function BackButton<a>(
    props: CoreProps<a>,
)
{
    return <BackButtonBase
        button={StyledButton}
        {...props}
    />;
}


const StyledButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Grid item>
            <Button
                variant={ 'contained' }
                color={ 'primary' }
                {...props}
            >
                <NavigateBeforeIcon />
            </Button>
        </Grid>
    );
