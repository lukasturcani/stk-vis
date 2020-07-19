import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {
    MongoConfigurator as MongoConfiguratorBase,
} from 'mongo-configurator/components/mongo-configurator';
import {
    InputFields
} from './input-fields';
import {
    GetMoleculesButton
} from './get-molecules-button';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';


interface Props
{
    url: string;
    moleculeKey: string;
    database: string;
    moleculeCollection: string;
    constructedMoleculeCollection: string;
    positionMatrixCollection: string;
    buildingBlockPositionMatrixCollection: string;
    numEntriesPerPage: number;
    selectBuildingBlocks: boolean;
    selectConstructedMolecules: boolean;
    updateFields: (mongoData: IMongoData) => void;
    updateMoleculePage: (pageData: IPageData) => void;
}


export function MongoConfigurator(
    props: Props,
)
{
    return <MongoConfiguratorBase
        component={ Container }
        inputFields={ InputFields }
        getMoleculesButton={ GetMoleculesButton }
        { ...props }
    />
}


const Container: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <Grid container
            alignItems={ 'center' }
            alignContent={ 'center' }
            justify={ 'center' }
            spacing={ 3 }
            style={{
                height: '100%',
                width: '99vw',
                paddingTop: '1%',
            }}
            direction='column'
        >
            { props.children }
        </Grid>
    );
