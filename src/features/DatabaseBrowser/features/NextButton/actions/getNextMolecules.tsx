import { createAction } from '@reduxjs/toolkit'
import {
    MoleculeRequestState
} from '../../MoleculeRequestState/MoleculeRequestState';
import {
    MoleculeRequestState as mrs
} from '../../MoleculeRequestState';
import { MoleculeTable } from '../../MoleculeTable';
import { MongoClient } from 'mongodb';


function assertNever(arg: never): never { throw Error(); }


export const getNextMolecules = (dispatch, getState) => {
    const {
        moleculeRequestState,
        mongoDbUrl,
        mongoDbDatabase,
        mongoDbCollections,
    } : {
        moleculeRequestState: MoleculeRequestState,
        mongoDbUrl: string,
        mongoDbDatabase: string,
        mongoDbCollections: { [propName:string]: string },
    }
    = getState();

    switch (moleculeRequestState) {
        case MoleculeRequestState.NoRequestSent:
        case MoleculeRequestState.RequestSucceeded:
        case MoleculeRequestState.RequestFailed:
            dispatch(mrs.actions.sendMoleculeRequest());
            // Actually get the next molecules here in an async way.
            MongoClient.connect(mongoDbUrl, function(err, client) {
                const collection = client
                    .db(mongoDbDatabase)
                    .collection(mongoDbCollections.molecules);
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
                    dispatch(MoleculeTable.actions.updateTable(
                        items.map( x => {} ),
                        columnValues,
                    ));
                    dispatch(
                        mrs.actions.setMoleculeRequestState(
                            MoleculeRequestState.RequestSucceeded
                        )
                    );
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
