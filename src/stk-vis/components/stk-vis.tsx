import * as React from 'react';
import {
    MongoConfigurator,
} from './styled/mongo-configurator/mongo-configurator';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';


interface ConfiguratorDispatchProps
{
    kind: 'Mongo Configurator';
    updateFields: (mongoData: IMongoData) => void;
    updateMoleculePage: (pageData: IPageData) => void;
}

interface ConfiguratorBaseProps
{
    kind: 'Mongo Configurator';
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
}


export type BaseProps = ConfiguratorBaseProps;
export type DispatchProps = ConfiguratorDispatchProps;
type Props =
    | (ConfiguratorBaseProps & ConfiguratorDispatchProps);


export function StkVis(
    props: Props,
)
{
    switch (props.kind)
    {
        case 'Mongo Configurator':
        {
            return <MongoConfigurator
                { ...props }
            />;
        }
    }
}
