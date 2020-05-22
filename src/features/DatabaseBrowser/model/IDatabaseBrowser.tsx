import {
    IMoleculeTable,
    IMongoDbState,
    IMoleculeRequestState,
} from '../features';


export interface IDatabaseBrowser {
    readonly moleculeTable: IMoleculeTable;
    readonly moleculeRequestState: IMoleculeRequestState;
    readonly mongoDbState: IMongoDbState;
}
