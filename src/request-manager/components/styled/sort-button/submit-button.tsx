import * as React from 'react';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import {
    BaseProps,
    ButtonProps,
    SubmitSortButton as SubmitSortButtonBase
} from 'request-manager/base/sort-button/submit-sort-button';


export const SubmitSortButton: React.FunctionComponent<BaseProps>
    = (props) => <SubmitSortButtonBase
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
