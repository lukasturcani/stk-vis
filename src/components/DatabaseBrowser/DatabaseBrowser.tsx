import * as React from 'react';
import { connect } from 'react-redux';
import { MoleculeTableComponent } from './MoleculeTable';
import {
    MoleculeRequestButtonComponent
} from './MoleculeRequestButton';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    IState,
    PageKind,
} from '../../models';
import {
    getDatabaseBrowserKind,
    getPageKind,
    getDatabaseBrowser,
} from '../../selectors';


interface IInitialDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Initial;
}


interface ILoadedDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Loaded;
    pageKind: PageKind;
}


type IDatabaseBrowserProps =
    | IInitialDatabaseBrowserProps
    | ILoadedDatabaseBrowserProps;


function assertNever(arg: never): never { throw Error(); }


function InitialDatabaseBrowserComponent()
{
    return (
        <div>
            <MoleculeRequestButtonComponent isForward={ true } />
        </div>
    );
}


function LoadedDatabaseBrowserComponent({
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


function DatabaseBrowser(props: IDatabaseBrowserProps)
{
    switch (props.kind)
    {
        case DatabaseBrowserKind.Initial:
            return <InitialDatabaseBrowserComponent />;

        case DatabaseBrowserKind.Loaded:

            return <LoadedDatabaseBrowserComponent
                firstPage={
                    props.pageKind === PageKind.First
                    ||
                    props.pageKind === PageKind.Only
                }
            />;

        default:
            assertNever(props);
    }
}


function mapStateToProps(
    state: IState,
)
    : IDatabaseBrowserProps
{
    const browser: IDatabaseBrowser
        = getDatabaseBrowser(state);

    switch (browser.kind)
    {
        case DatabaseBrowserKind.Initial:
            return {
                kind: DatabaseBrowserKind.Initial,
            };

        case DatabaseBrowserKind.Loaded:
            return {
                kind: DatabaseBrowserKind.Loaded,
                pageKind: getPageKind(browser),
            };

        default:
            assertNever(browser);
    }
}


export const DatabaseBrowserComponent
    = connect(mapStateToProps)(DatabaseBrowser);
