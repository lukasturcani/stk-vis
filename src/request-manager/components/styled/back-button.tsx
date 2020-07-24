import * as React from 'react';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {
    ButtonProps,
    BackButton as BackButtonBase
} from 'request-manager/base/back-button';
import {
    BackButtonProps,
} from 'RequestManager.RequestManager'


export const BackButton: React.FunctionComponent<BackButtonProps>
    = (props) => <BackButtonBase
        button={StyledButton}
        {...props}
    />;


const StyledButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Button
            variant={ 'contained' }
            color={ 'primary' }
            {...props}
        >
            <NavigateBeforeIcon />
        </Button>
    );
