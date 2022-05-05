import * as React from 'react';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import {
    CoreProps,
    ButtonProps,
    SubmitButton as SubmitButtonBase,
} from '../base/submit-button';

export function SubmitButton<a>(
    props: CoreProps<a>,
)
{
    return <SubmitButtonBase
        button={StyledButton}
        {...props}
    />;
}


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
