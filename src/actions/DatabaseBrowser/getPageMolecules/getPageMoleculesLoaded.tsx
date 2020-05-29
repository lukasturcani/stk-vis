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
} from '../../../selectors';
import { assertNever, sendMongoDbRequest } from './utilities';


interface getPageMoleculesLoadedOptions
{
    pageIndex: number;
    successSnackbar: (message: string) => void;
    failureSnackbar: (message: string) => void;
    dispatch: (arg: AnyAction) => void;
    state: ILoadedDatabaseBrowser;
}


export function getPageMoleculesLoaded(
    options: getPageMoleculesLoadedOptions,
)
    : void
{
    const moleculeRequestState: IMoleculeRequestState
        = getMoleculeRequestState(options.state);

    switch (moleculeRequestState.kind) {
        case MoleculeRequestStateKind.RequestSucceeded:
        case MoleculeRequestStateKind.RequestFailed:
            options.dispatch(sendMoleculeRequest());
            sendMongoDbRequest(options);
            break;

        case MoleculeRequestStateKind.RequestSent:
            break;

        default:
            assertNever(moleculeRequestState);
            break;
    };

}
