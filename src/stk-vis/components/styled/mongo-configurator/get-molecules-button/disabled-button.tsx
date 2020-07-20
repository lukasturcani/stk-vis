import * as React from 'react';
import Button from '@material-ui/core/Button';


type Empty = Record<string, unknown>;

export const DisabledButton: React.FunctionComponent<Empty>
    = (props) => (
        <Button
            disabled={ true }
            variant={ 'contained' }
            color={ 'primary' }
        >
            { props.children }
        </Button>
    );
