import * as React from 'react';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import {
    BaseProps,
    DispatchProps,
    ButtonProps,
    SubmitButton as SubmitButtonBase
} from 'request-manager/base/sort-button/submit-button';

type Props = BaseProps & DispatchProps

export const SubmitButton: React.FunctionComponent<Props>
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
