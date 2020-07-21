import * as React from 'react';
import Button from '@material-ui/core/Button';
import {
    EnabledButtonProps,
} from 'mongo-configurator/components/get-molecules-button';


export const EnabledButton: React.FunctionComponent<EnabledButtonProps>
    = (props) => (
        <Button
            variant={ 'contained' }
            color={ 'primary' }
            { ...props }
        >
            { props.children }
        </Button>
    );
