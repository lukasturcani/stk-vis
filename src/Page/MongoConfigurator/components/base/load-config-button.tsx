import * as React from 'react';


type Empty = Record<string, unknown>;

export interface ButtonProps
{
    onClick: () => void;
}

interface Props
{
    button: React.FunctionComponent<ButtonProps>;
}


export function LoadConfigButton(props: Props)
{
    return <props.button
        onClick={ () => { return ; } }
    />;
}
