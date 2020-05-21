import { IMoleculeTable } from './IMoleculeTable';
import { IMongoDbState } from './IMongoDbState';
import { IMoleculeRequestState } from './IMoleculeRequestState';


export interface IDatabaseBrowser {
    getMoleculeTable(): IMoleculeTable;
    getMoleculesRequestState(): IMoleculeRequestState;
    getMongoDbState(): IMongoDbState;
}
