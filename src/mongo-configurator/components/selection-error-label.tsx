import * as React from 'react';
import FormLabel from '@material-ui/core/FormLabel';


interface Props
{
    buildingBlocks: boolean;
    constructedMolecules: boolean;
}


export function SelectionErrorLabel(props: Props)
{
    const label: string
        = '* Pick at least one.';

    if (!props.buildingBlocks && !props.constructedMolecules)
    {
        return <FormLabel error={ true }>{ label }</FormLabel>;
    }
    return  <FormLabel error={ false }> { label }</FormLabel>;
}
