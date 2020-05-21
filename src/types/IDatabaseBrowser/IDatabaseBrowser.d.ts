/// <reference path="./IMoleculeTable.d.ts" />
/// <reference path="./IMoleculeRequestState.d.ts" />
/// <reference path="./IMongoDbState.d.ts" />


interface IDatabaseBrowser {
    getMoleculeTable(): IMoleculeTable;
    getMoleculesRequestState(): IMoleculeRequestState;
    getMongoDbState(): IMongoDbState;
}
