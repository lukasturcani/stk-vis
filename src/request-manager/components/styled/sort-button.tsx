import * as React from 'react';
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';
import {
    SortButton as SortButtonBase,
    ButtonProps,
} from 'request-manager/base/sort-button';
import {
    SortButtonProps,
} from 'RequestManager.RequestManager'


export const SortButton: React.FunctionComponent<SortButtonProps>
    = (props) => <SortButtonBase
        button={StyledButton}
        {...props}
    />;


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
