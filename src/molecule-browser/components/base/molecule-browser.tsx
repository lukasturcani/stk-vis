import * as React from 'react';
import {
    MoleculeBrowserProps,
} from 'MoleculeBrowser.MoleculeBrowser'
import {
    MoleculeTableProps,
    TwoDViewerProps,
    ThreeDViewerProps,
} from 'Molecules.Molecules';
import {
    SortButtonProps,
    BackButtonProps,
    NextButtonProps,
} from 'RequestManager.RequestManager';


interface Props extends MoleculeBrowserProps
{
    root: React.FunctionComponent<Record<string, unknown>>;
    sortButton: React.FunctionComponent<SortButtonProps>;
    moleculeTable: React.FunctionComponent<MoleculeTableProps>;
    twoDViewer: React.FunctionComponent<TwoDViewerProps>;
    threeDViewer: React.FunctionComponent<ThreeDViewerProps>;
    backButton: React.FunctionComponent<BackButtonProps>;
    nextButton: React.FunctionComponent<NextButtonProps>;
}


export function MoleculeBrowser(
    props: Props,
)
{
    return (
        <props.root>
            <props.sortButton    {...props.value0.sortButton}    />
            <props.moleculeTable {...props.value0.moleculeTable} />
            <props.twoDViewer    {...props.value0.twoDViewer}    />
            <props.threeDViewer  {...props.value0.threeDViewer}  />
            <props.backButton    {...props.value0.backButton}    />
            <props.nextButton    {...props.value0.nextButton}    />
        </props.root>
    );
}
