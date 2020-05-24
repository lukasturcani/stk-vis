import { createAction, AnyAction } from '@reduxjs/toolkit'
import {
    InitialRequestStateKind,
    MoleculeRequestStateKind,
    IMoleculeRequestState,
    IInitialRequestState,
    IState,
    DatabaseBrowserKind,
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
} from '../../models';
import { updateTable } from './updateTable';
import { sendMoleculeRequest } from './sendMoleculeRequest';
import { MongoClient } from 'mongodb';
import {
    getInitialRequestState,
    getMoleculeRequestState,
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
} from '../../selectors';


function assertNever(arg: never): never { throw Error(); }


interface IInchiKeyMap {
    [moleculeId: number]: string
}


function getNextMoleculesInitial(
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


function getNextMoleculesLoaded(
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


export function getNextMolecules(
    dispatch: (arg: AnyAction) => void,
    getState: () => IState,
)
    : void
{

    const state: IState = getState();
    switch (state.kind) {

        case DatabaseBrowserKind.Initial:
            getNextMoleculesInitial(dispatch, state);
            break;

        case DatabaseBrowserKind.Loaded:
            getNextMoleculesLoaded(dispatch, state);
            break;

        default:
            assertNever(state);
            break;
    }
}
