import * as React from 'react';
import {
    MongoConfigurator,
} from 'mongo-configurator/components/mongo-configurator';


export function StkVis()
{
    return <MongoConfigurator
        url={ '' }
        moleculeKey={ '' }
        database={ '' }
        moleculeCollection={ '' }
        constructedMoleculeCollection={ '' }
        positionMatrixCollection={ '' }
        buildingBlockPositionMatrixCollection={ '' }
        numEntriesPerPage={ 34 }
        selectBuildingBlocks={ true }
        selectConstructedMolecules={ true }
    />;
}
