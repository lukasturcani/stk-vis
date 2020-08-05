import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import RefreshIcon from '@material-ui/icons/Refresh';
import {
    ButtonProps,
    NextButton as NextButtonBase,
    DispatchProps,
} from 'request-manager/base/next-button';
import {
    NextButtonProps,
} from 'RequestManager.RequestManager'

type Props = NextButtonProps & DispatchProps;

export const NextButton: React.FunctionComponent<Props>
    = (props) =>
{
    if (props.value0.lastPage)
    {
        return <NextButtonBase
            button={LastButton}
            {...props}
        />;
    }
    return <NextButtonBase
        button={NonLastButton}
        {...props}
    />;
}


const NonLastButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Grid item>
            <Button
                variant={ 'contained' }
                color={ 'primary' }
                {...props}
            >
                <NavigateNextIcon />
            </Button>
        </Grid>
    );

const LastButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Grid item>
            <Button
                variant={ 'contained' }
                color={ 'primary' }
                {...props}
            >
                <RefreshIcon />
            </Button>
        </Grid>
    );
