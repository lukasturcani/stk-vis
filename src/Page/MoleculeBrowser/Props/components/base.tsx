import * as React from 'react';
import {
    Props as MoleculeBrowserProps,
} from 'Page.MoleculeBrowser.Props'
import {
    CoreProps as SortButtonProps,
} from '../../SortButton/components/base/sort-button';
import {
    CoreProps as MoleculeTableProps,
} from '../../MoleculeTable/components/base';


type Empty = Record<string, unknown>;

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export type CoreProps<a> = DispatchProps<a> & MoleculeBrowserProps<a>;

interface Props<a> extends MoleculeBrowserProps<a>, DispatchProps<a>
{
    root: React.FunctionComponent<Record<string, unknown>>;
    sortButtonComponent: React.FunctionComponent<SortButtonProps<a>>;
    moleculeTableComponent:
        React.FunctionComponent<MoleculeTableProps<a>>;
}


export function MoleculeBrowser<a>(
    props: Props<a>,
)
{
    return (
        <props.root>
            <props.sortButtonComponent
                dispatch={props.dispatch}
                {...props.sortButton}
            />
            <props.moleculeTableComponent
                dispatch={props.dispatch}
                {...props.moleculeTable}
            />
        </props.root>
    );
}
