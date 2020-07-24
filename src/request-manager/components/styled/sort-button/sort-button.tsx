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
import {
    SortSettings,
} from 'request-manager/styled/sort-button/sort-settings';


export const SortButton: React.FunctionComponent<SortButtonProps>
    = (props) => <SortButtonBase
        container={Container}
        button={StyledButton}
        {...props}
        sortSettings={SortSettings}
    />;

type Empty = Record<string, unknown>;

const Container: React.FunctionComponent<Empty>
    = (props) => (
        <div>
            {props.children}
        </div>
    );


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
