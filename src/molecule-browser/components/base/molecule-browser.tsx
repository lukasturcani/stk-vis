import * as React from 'react';
import {
    Props as MoleculeBrowserProps,
} from 'MoleculeBrowser.MoleculeBrowser'
import {
    TwoDViewerProps,
    ThreeDViewerProps,
} from 'Molecules.Molecules';
import {
    CoreProps as BackButtonProps,
} from 'request-manager/base/back-button';
import {
    CoreProps as MoleculeTableProps,
} from 'molecules/base/molecule-table';

import {
    CoreProps as NextButtonProps,
} from 'request-manager/base/next-button';
import {
    CoreProps as SortButtonProps,
} from 'request-manager/base/sort-button';
import {
    RequestResult,
} from 'RequestManager.RequestResult';
import { Molecule } from 'Molecules.Molecule';


type Empty = Record<string, unknown>;

export interface DispatchProps
{
    dispatch: {
        setSortedCollection:
            (
                sortType: 'ascending' | 'descending',
                collection: string,
            ) => void,
        handleResult: (result: RequestResult) => void;
        selectMolecule: (selected: number, molecule: Molecule) => void;
    }
}

export type CoreProps<a> = DispatchProps & MoleculeBrowserProps<a>;

interface Props<a> extends MoleculeBrowserProps<a>, DispatchProps
{
    root: React.FunctionComponent<Record<string, unknown>>;
    sortButton: React.FunctionComponent<SortButtonProps>;
    moleculeTable: React.FunctionComponent<MoleculeTableProps>;
    viewerContainer: React.FunctionComponent<Empty>;
    twoDViewer: React.FunctionComponent<TwoDViewerProps>;
    threeDViewer: React.FunctionComponent<ThreeDViewerProps>;
    navigationButtonContainer: React.FunctionComponent<Empty>;
    backButton: React.FunctionComponent<BackButtonProps<a>>;
    nextButton: React.FunctionComponent<NextButtonProps>;
}


export function MoleculeBrowser<a>(
    props: Props<a>,
)
{
    return (
        <props.root>
            <props.sortButton
                {...props.dispatch}
                {...props.value0.sortButton}
            />
            <props.moleculeTable
                {...props.dispatch}
                {...props.value0.moleculeTable}
            />
            <props.viewerContainer>
                <props.twoDViewer    {...props.value0.twoDViewer}    />
                <props.threeDViewer  {...props.value0.threeDViewer}  />
            </props.viewerContainer>
            <props.navigationButtonContainer>
                <props.backButton
                    {...props.dispatch}
                    {...props.value0.backButton}
                />
                <props.nextButton
                    {...props.dispatch}
                    {...props.value0.nextButton}
                />
            </props.navigationButtonContainer>
        </props.root>
    );
}
