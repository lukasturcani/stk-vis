import * as React from 'react';
import {
    getDatabaseBrowserKind,
    getPageKind,
    getDatabaseBrowser,
} from '../../../selectors';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    IState,
    PageKind,
} from '../../../models';
import {
    MoleculeRequestButtonComponent
} from '../MoleculeRequestButton';


export interface IInitialDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Initial;
}


export function InitialDatabaseBrowserComponent()
{
    return (
        <div>
            <MoleculeRequestButtonComponent isForward={ true } />
        </div>
    );
}
