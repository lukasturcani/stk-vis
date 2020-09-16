import {
    MongoData,
} from 'Page.MongoConfigurator';


const fs = require('fs');


export function readConfig(
    filename: string,
    defaults: MongoData,
)
    : MongoData
{
    const config = Object.assign({}, defaults);
    const read = JSON.parse(fs.readFileSync(filename));

    if (typeof read.url === 'string')
    {
        config.url = read.url;
    }
    if (typeof read.moleculeKey === 'string')
    {
        config.moleculeKey = read.moleculeKey;
    }
    if (typeof read.database === 'string')
    {
        config.database = read.database;
    }
    if (typeof read.moleculeCollection === 'string')
    {
        config.moleculeCollection = read.moleculeCollection;
    }
    if (typeof read.constructedMoleculeCollection === 'string')
    {
        config.constructedMoleculeCollection
            = read.constructedMoleculeCollection;
    }
    if (typeof read.positionMatrixCollection === 'string')
    {
        config.positionMatrixCollection
            = read.positionMatrixCollection;
    }
    if (
        typeof read.buildingBlockPositionMatrixCollection
        ===
        'string'
    )
    {
        config.buildingBlockPositionMatrixCollection
            = read.buildingBlockPositionMatrixCollection;
    }
    if (typeof read.numEntriesPerPage === 'number')
    {
        config.numEntriesPerPage = read.numEntriesPerPage;
    }
    if (typeof read.selectBuildingBlocks === 'boolean')
    {
        config.selectBuildingBlocks = read.selectBuildingBlocks;
    }
    if (typeof read.selectConstructedMolecules === 'boolean')
    {
        config.selectConstructedMolecules
            = read.selectConstructedMolecules;
    }
    if (typeof read.twoDViewer === 'boolean')
    {
        config.twoDViewer = read.twoDViewer;
    }
    if (typeof read.threeDViewer === 'boolean')
    {
        config.threeDViewer = read.threeDViewer;
    }

    return config;
}
