import * as React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import {
    Maybe,
    MaybeKind,
} from 'maybe';
import {
    SearchKind
} from '../../../../models';
import {
    getSearchKind,
} from '../utilities';


interface Props
{
    buildingBlocks: boolean;
    constructedMolecules: boolean;
}


export function SelectionErrorLabel(props: Props)
{
    const label: string
        = '* Pick at least one.';

    const moleculeSelectionType: Maybe<SearchKind>
        = getSearchKind(
            props.buildingBlocks,
            props.constructedMolecules,
        );

    switch (moleculeSelectionType.kind)
    {
        case MaybeKind.Nothing:
            return <FormLabel error={ true }>{ label }</FormLabel>;
        case MaybeKind.Just:
            return  <FormLabel error={ false }> { label }</FormLabel>;
        default:
            assertNever(moleculeSelectionType);
    }
}


function assertNever(arg: never): never { throw Error(); }
