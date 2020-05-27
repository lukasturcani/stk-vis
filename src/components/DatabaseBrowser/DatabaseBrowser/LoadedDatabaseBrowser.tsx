import * as React from 'react';
import {
    getDatabaseBrowserKind,
    getPageKind,
    getDatabaseBrowser,
} from '../../../selectors';
import { MoleculeTableComponent } from '../MoleculeTable';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    IState,
    PageKind,
} from '../../../models';
import {
    MoleculeRequestButtonComponent
} from '../MoleculeRequestButton';


export interface ILoadedDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Loaded;
    pageKind: PageKind;
}


export function LoadedDatabaseBrowserComponent({
    firstPage ,
}: {
    firstPage: boolean,
})
{
    return (
        <div>
            <MoleculeTableComponent />
            {
                !firstPage
                &&
                <MoleculeRequestButtonComponent isForward={ false } />
            }
            <MoleculeRequestButtonComponent isForward={ true } />
        </div>
    );
}
