import { AnyAction } from '@reduxjs/toolkit'
import {
    MoleculeRequestStateKind,
    IMoleculeRequestState,
    ILoadedDatabaseBrowser,
} from '../../../models';
import { updateTable } from '../updateTable';
import { sendMoleculeRequest } from '../sendMoleculeRequest';
import { MongoClient } from 'mongodb';
import {
    getMoleculeRequestState,
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
} from '../../../selectors';
import { assertNever, sendMongoDbRequest } from './utilities';


export function getNextMoleculesLoaded(
    dispatch: (arg: AnyAction) => void,
    state: ILoadedDatabaseBrowser,
)
    : void
{
    const moleculeRequestState: IMoleculeRequestState
        = getMoleculeRequestState(state);
    const url: string = getMongoDbUrl(state);
    const database: string = getMongoDbDatabase(state);
    const moleculesCollection: string
        = getMongoDbMoleculeCollection(state);

    switch (moleculeRequestState.kind) {
        case MoleculeRequestStateKind.RequestSucceeded:
        case MoleculeRequestStateKind.RequestFailed:
            dispatch(sendMoleculeRequest());
            sendMongoDbRequest(state, dispatch);
            break;

        case MoleculeRequestStateKind.RequestSent:
            break;

        default:
            assertNever(moleculeRequestState);
            break;
    };

}
