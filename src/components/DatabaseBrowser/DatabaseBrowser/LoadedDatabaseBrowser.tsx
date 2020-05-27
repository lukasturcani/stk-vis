import * as React from 'react';
import { connect } from 'react-redux';
import {
    getPageKind,
} from '../../../selectors';
import { MoleculeTableComponent } from '../MoleculeTable';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    ILoadedDatabaseBrowser,
    PageKind,
} from '../../../models';
import {
    MoleculeRequestButtonComponent
} from '../MoleculeRequestButton';
import { MongoDbFieldsComponent } from '../MongoDbFields';


interface ILoadedDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Loaded;
    pageKind: PageKind;
}


function LoadedDatabaseBrowser(props: ILoadedDatabaseBrowserProps)
{
    return (
        <div>
            <MongoDbFieldsComponent />
            <MoleculeTableComponent />
            {
                !(
                    props.pageKind === PageKind.First
                    ||
                    props.pageKind === PageKind.Only
                )
                &&
                <MoleculeRequestButtonComponent isForward={ false } />
            }
            <MoleculeRequestButtonComponent isForward={ true } />
        </div>
    );
}


function mapStateToProps(
    state: ILoadedDatabaseBrowser
)
    : ILoadedDatabaseBrowserProps
{
    return {
        kind:
            DatabaseBrowserKind.Loaded,

        pageKind:
            getPageKind(state),

    };
}


export const LoadedDatabaseBrowserComponent
    = connect(mapStateToProps)(LoadedDatabaseBrowser)
