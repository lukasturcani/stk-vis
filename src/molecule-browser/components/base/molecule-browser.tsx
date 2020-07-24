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


type Empty = Record<string, unknown>;

interface Props extends MoleculeBrowserProps
{
    root: React.FunctionComponent<Record<string, unknown>>;
    sortButton: React.FunctionComponent<SortButtonProps>;
    moleculeTable: React.FunctionComponent<MoleculeTableProps>;
    viewerContainer: React.FunctionComponent<Empty>;
    twoDViewer: React.FunctionComponent<TwoDViewerProps>;
    threeDViewer: React.FunctionComponent<ThreeDViewerProps>;
    navigationButtonContainer: React.FunctionComponent<Empty>;
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
            <props.viewerContainer>
                <props.twoDViewer    {...props.value0.twoDViewer}    />
                <props.threeDViewer  {...props.value0.threeDViewer}  />
            </props.viewerContainer>
            <props.navigationButtonContainer>
                <props.backButton    {...props.value0.backButton}    />
                <props.nextButton    {...props.value0.nextButton}    />
            </props.navigationButtonContainer>
        </props.root>
    );
}
