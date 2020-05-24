import { AnyAction } from '@reduxjs/toolkit'
import {
    InitialRequestStateKind,
    IInitialRequestState,
    IInitialDatabaseBrowser,
} from '../../../models';
import { updateTable } from '../updateTable';
import { sendMoleculeRequest } from '../sendMoleculeRequest';
import { MongoClient } from 'mongodb';
import {
    getInitialRequestState,
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
} from '../../../selectors';
import { IInchiKeyMap, assertNever } from './utilities';


export function getNextMoleculesInitial(
    dispatch: (arg: AnyAction) => void,
    state: IInitialDatabaseBrowser,
)
    : void
{
    const initialRequestState: IInitialRequestState
        = getInitialRequestState(state);
    const url: string = getMongoDbUrl(state);
    const database: string = getMongoDbDatabase(state);
    const moleculesCollection: string
        = getMongoDbMoleculeCollection(state);

    switch (initialRequestState.kind) {
        case InitialRequestStateKind.NoRequestSent:
        case InitialRequestStateKind.RequestSucceeded:
        case InitialRequestStateKind.RequestFailed:
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

        case InitialRequestStateKind.RequestSent:
            break;

        default:
            assertNever(initialRequestState);
            break;
    };

}
