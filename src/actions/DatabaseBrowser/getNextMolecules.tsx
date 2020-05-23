import { createAction } from '@reduxjs/toolkit'
import {
    MoleculeRequestStateKind,
    IMoleculeRequestState,
    IState,
} from '../../models';
import { updateTable } from './updateTable';
import { sendMoleculeRequest } from './sendMoleculeRequest';
import { MongoClient } from 'mongodb';
import {
    getMoleculeRequestState,
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
} from '../../selectors';


function assertNever(arg: never): never { throw Error(); }


interface IInchiKeyMap {
    [moleculeId: number]: string
}


export function getNextMolecules(
    dispatch: (arg: any) => any,
    getState: () => IState,
){
    const state = getState();
    const moleculeRequestState: IMoleculeRequestState
        = getMoleculeRequestState(state);
    const url: string = getMongoDbUrl(state);
    const database: string = getMongoDbDatabase(state);
    const moleculesCollection: string
        = getMongoDbMoleculeCollection(state);

    switch (moleculeRequestState.kind) {
        case MoleculeRequestStateKind.NoRequestSent:
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
