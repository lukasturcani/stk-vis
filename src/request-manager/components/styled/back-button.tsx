import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {
    ButtonProps,
    BackButton as BackButtonBase,
    DispatchProps,
} from 'request-manager/base/back-button';
import {
    BackButtonProps,
} from 'RequestManager.RequestManager'

type Props = BackButtonProps & DispatchProps;

export const BackButton: React.FunctionComponent<Props>
    = (props) => <BackButtonBase
        button={StyledButton}
        {...props}
    />;


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
