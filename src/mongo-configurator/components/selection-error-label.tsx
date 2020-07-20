import * as React from 'react';


export interface BaseProps
{
    buildingBlocks: boolean;
    constructedMolecules: boolean;
}

interface Props extends BaseProps
{
    component: React.FunctionComponent<LabelProps>;
}


export interface LabelProps
{
    error: boolean;
}


export function SelectionErrorLabel(
    props: Props,
)
{
    const label: string
        = '* Pick at least one.';

    if (!props.buildingBlocks && !props.constructedMolecules)
    {
        return (
            <props.component
                error={ true }
            >{ label }
            </props.component>
        );
    }
    return  (
        <props.component
            error={ false }
        >{ label }
        </props.component>
    );
}
