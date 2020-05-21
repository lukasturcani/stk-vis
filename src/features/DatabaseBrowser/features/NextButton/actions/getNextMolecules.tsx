import { createAction } from '@reduxjs/toolkit'
import {
    MoleculeRequestState
} from '../../MoleculeRequestState/MoleculeRequestState';
import {
    MoleculeRequestState as mrs
} from '../../MoleculeRequestState';
import { MongoClient } from 'mongodb';


function assertNever(arg: never): never { throw Error(); }


export const getNextMolecules = (dispatch, getState) => {
    const { moleculeRequestState }
        : { moleculeRequestState: MoleculeRequestState }
        = getState();

    switch (moleculeRequestState) {
        case MoleculeRequestState.NoRequestSent:
        case MoleculeRequestState.RequestSucceeded:
        case MoleculeRequestState.RequestFailed:
            dispatch(mrs.actions.sendMoleculeRequest());
            // Actually get the next molecules here in an async way.
            const url = 'mongodb://localhost:27017';
            const dbName = 'stk'
            MongoClient.connect(url, function(err, client) {
                const collection = client
                    .db(dbName)
                    .collection('molecules');
                collection.find({}).toArray(function(err, items) {
                    console.log(items);
                });
                client.close();
            });
            break;
        case MoleculeRequestState.RequestSent:
            break;
        default:
            assertNever(moleculeRequestState);
            break;
    };
};
