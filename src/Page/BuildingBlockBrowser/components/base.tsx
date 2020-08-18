import * as React from 'react';
import {
    Props as BrowserProps,
} from 'Page.BuildingBlockBrowser'
import {
    CoreProps as MoleculeTableProps,
} from '../../MoleculeBrowser/MoleculeTable/components/base';
import {
    Props as TwoDViewerProps,
} from 'Page.MoleculeBrowser.TwoDViewer';
import {
    Props as ThreeDViewerProps,
} from 'Page.MoleculeBrowser.ThreeDViewer';


type Empty = Record<string, unknown>;

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export type CoreProps<a> = DispatchProps<a> & BrowserProps<a>;

interface Props<a> extends BrowserProps<a>, DispatchProps<a>
{
    root: React.FunctionComponent<Record<string, unknown>>;
    moleculeTableComponent:
        React.FunctionComponent<MoleculeTableProps<a>>;
    viewerContainer: React.FunctionComponent<Empty>;
    twoDViewerComponent: React.FunctionComponent<TwoDViewerProps>;
    threeDViewerComponent: React.FunctionComponent<ThreeDViewerProps>;
}


export function MoleculeBrowser<a>(
    props: Props<a>,
)
{
    return (
        <props.root>
            <props.moleculeTableComponent
                dispatch={props.dispatch}
                {...props.moleculeTable}
            />
            <props.viewerContainer>
                <props.twoDViewerComponent {...props.twoDViewer}    />
                <props.threeDViewerComponent {...props.threeDViewer} />
            </props.viewerContainer>
        </props.root>
    );
}
