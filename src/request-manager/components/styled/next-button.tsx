import * as React from 'react';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
    ButtonProps,
    NextButton as NextButtonBase
} from 'request-manager/base/next-button';
import {
    NextButtonProps,
} from 'MoleculeBrowser.MoleculeBrowser'


export const NextButton: React.FunctionComponent<NextButtonProps>
    = (props) => <NextButtonBase
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
            <NavigateNextIcon />
        </Button>
    );
