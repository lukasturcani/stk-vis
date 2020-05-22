import { createAction } from '@reduxjs/toolkit'
import {
    sendMoleculeRequest,
    MoleculeRequestStateKind,
    IMoleculeRequestState,
} from '../../MoleculeRequestState';
import { updateTable } from '../../MoleculeTable';
import { MongoClient } from 'mongodb';


function assertNever(arg: never): never { throw Error(); }


export const getNextMolecules = (dispatch, getState) => {
    const state = getState();
    const moleculeRequestState: IMoleculeRequestState
        = getMoleculeRequestState(state);
    const url: string = getMongoDbUrl(state);
    const database: string = getMongoDbDatabase(state);
    const moleculesCollection: string
        = getMongoDbMoleculesCollection(state);

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
                    const inchiKeys = {}
                    for (let i = 0; i < items.length; ++i)
                    {
                        inchiKeys[i] = items[i]['InChIKey'];
                    }
                    const columnValues = {
                        InChIKey: inchiKeys,
                        numAtoms: {0: 0, 1: 1,},
                    }
                    dispatch(updateTable({
                        molecules: items.map( x => {} ),
                        visibleColumns: undefined,
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
};
