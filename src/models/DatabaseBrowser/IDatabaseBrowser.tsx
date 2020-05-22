import { IMoleculeTable } from './IMoleculeTable';
import { IMongoDbState } from './IMongoDbState';
import { IMoleculeRequestState } from './IMoleculeRequestState';


export interface IDatabaseBrowser {
    readonly moleculeTable: IMoleculeTable;
    readonly moleculeRequestState: IMoleculeRequestState;
    readonly mongoDbState: IMongoDbState;
}
