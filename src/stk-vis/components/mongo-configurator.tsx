import * as React from 'react';
import { connect } from 'react-redux';
import * as MongoConfigurator from 'MongoConfigurator';
import {
    MongoConfigurator as ConfiguratorComponent
} from 'mongo-configurator/components/mongo-configurator';


function mapStateToProps(state)
{
    state = state.value0;

    let selectBuildingBlocks: boolean
        = false;

    let selectConstructedMolecules: boolean
        = false;

    const searchKind = MongoConfigurator.searchKind(state);
    if (searchKind.constructor.name === 'UnsortedAll')
    {
        selectBuildingBlocks = true;
        selectConstructedMolecules = true;
    }
    if (searchKind.constructor.name === 'UnsortedBuildingBlocks')
    {
        selectBuildingBlocks = true;
    }
    if (searchKind.constructor.name === 'UnsortedConstructedMolecules')
    {
        selectConstructedMolecules = true;
    }

    return {
        url:
            MongoConfigurator.url(state),

        moleculeKey:
            MongoConfigurator.moleculeKey(state),

        database:
            MongoConfigurator.database(state),

        moleculeCollection:
            MongoConfigurator.moleculeCollection(state),

        constructedMoleculeCollection:
            MongoConfigurator.constructedMoleculeCollection(state),

        positionMatrixCollection:
            MongoConfigurator.positionMatrixCollection(state),

        buildingBlockPositionMatrixCollection:
            MongoConfigurator.buildingBlockPositionMatrixCollection(
                state,
            ),

        numEntriesPerPage:
            MongoConfigurator.numEntriesPerPage(state),

        selectBuildingBlocks:
            selectBuildingBlocks,

        selectConstructedMolecules:
            selectConstructedMolecules,
    };
}


const ConnectedComponent
    = connect(mapStateToProps)(ConfiguratorComponent);


export { ConnectedComponent  as MongoConfigurator };
