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
import { IInchiKeyMap, assertNever } from './utilities';


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

            MongoClient.connect(url, function(err, client) {
                const collection = client
                    .db(database)
                    .collection(moleculesCollection);

                collection.find({}).toArray(function(err, items) {
                    const inchiKeys: IInchiKeyMap = {}
                    for (let i = 0; i < items.length; ++i)
                    {
                        inchiKeys[i] = items[i]['InChIKey'];
                    }
                    const columnValues = {
                        InChIKey: inchiKeys,
                        numAtoms: {0: 0, 1: 1,},
                    }
                    dispatch(updateTable({
                        molecules: items.map( x => { return {}; } ),
                        visibleColumns: {'InChIKey': inchiKeys},
                    }));
                });

                client.close();
            });
            break;

        case MoleculeRequestStateKind.RequestSent:
            break;

        default:
            assertNever(moleculeRequestState);
            break;
    };

}
