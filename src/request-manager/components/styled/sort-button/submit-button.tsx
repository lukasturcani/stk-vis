import * as React from 'react';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import {
    BaseProps,
    ButtonProps,
    SubmitButton as SubmitButtonBase
} from 'request-manager/base/sort-button/submit-button';


export const SubmitButton: React.FunctionComponent<BaseProps>
    = (props) => <SubmitButtonBase
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
            <DoneIcon />
        </Button>
    );
