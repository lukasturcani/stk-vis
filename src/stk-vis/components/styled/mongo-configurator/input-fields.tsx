import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {
    InputFields as InputFieldsBase,
} from 'mongo-configurator/components/input-fields';
import { SearchKindSelector } from './search-kind-selector';


export interface Props
{
    url: string;
    setUrl: (url: string) => void;

    moleculeKey: string;
    setMoleculeKey: (moleculeKey: string) => void;

    database: string;
    setDatabase: (database: string) => void;

    moleculeCollection: string;
    setMoleculeCollection: (collection: string) => void;

    constructedMoleculeCollection: string;
    setConstructedMoleculeCollection: (collection: string) => void;

    positionMatrixCollection: string;
    setPositionMatrixCollection: (collection: string) => void;

    buildingBlockPositionMatrixCollection: string;
    setBuildingBlockPositionMatrixCollection:
        (collection: string) => void;

    numEntriesPerPage: number;
    setNumEntriesPerPage: (numEntries: number) => void;

    selectBuildingBlocks: boolean;
    setSelectBuildingBlocks: (select: boolean) => void;

    selectConstructedMolecules: boolean;
    setSelectConstructedMolecules: (select: boolean) => void;
}


export function InputFields(
    props: Props,
)
{
    return (
        <InputFieldsBase { ...props }
            component={ Container }
            searchKindSelector={ SearchKindSelector }
        />
    );
}


const Container: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <Grid container
            alignItems={ 'center' }
            alignContent={ 'center' }
            justify={ 'center' }
            spacing={ 4 }
            style={ {height: '100%'} }
        >
            { props.children }
        </Grid>
    );
