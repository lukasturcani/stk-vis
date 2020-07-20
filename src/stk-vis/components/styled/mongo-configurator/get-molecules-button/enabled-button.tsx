import * as React from 'react';
import Button from '@material-ui/core/Button';


interface ButtonProps
{
    onClick: () => void;
}

export const EnabledButton: React.FunctionComponent<ButtonProps>
    = (props) => (
        <Button
            variant={ 'contained' }
            color={ 'primary' }
            { ...props }
        >
            { props.children }
        </Button>
    );
