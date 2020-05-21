import {
    IMoleculeTable,
    IMongoDbState,
    IMoleculeRequestState,
} from '../features';


export interface IDatabaseBrowser {
    readonly moleculeTable: IMoleculeTable;
    readonly moleculesRequestState: IMoleculeRequestState;
    readonly mongoDbState: IMongoDbState;
}
