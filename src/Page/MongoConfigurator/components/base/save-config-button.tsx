import * as React from 'react';
import {
    MongoData,
} from 'Page.MongoConfigurator';


type Empty = Record<string, unknown>;

export interface ButtonProps
{
    onClick: () => void;
}

interface Props extends MongoData
{
    button: React.FunctionComponent<ButtonProps>;
}


export function SaveConfigButton(props: Props)
{
    return <props.button
        onClick={ () => { return ; } }
    />;
}
