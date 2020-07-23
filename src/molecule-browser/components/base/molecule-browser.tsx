import * as React from 'react';
import { BaseProps as SortButtonProps } from './sort-button';
import {
    BaseProps as MoleculeTableProps,
} from './molecule-table';
import {
    BaseProps as TwoDViewerProps,
} from './2d-viewer';
import {
    BaseProps as ThreeDViewerProps,
} from './3d-viewer';
import {
    BaseProps as BackButtonProps,
} from './back-button';
import {
    BaseProps as NextButtonProps,
} from './next-button';


export interface BaseProps
{
    sortButtonProps: SortButtonProps;
    moleculeTableProps: MoleculeTableProps;
    twoDViewerProps: TwoDViewerProps;
    threeDViewerProps: ThreeDViewerProps;
    backButtonProps: BackButtonProps;
    nextButtonProps: NextButtonProps;
}


export interface DispatchProps
{
}


interface Props extends BaseProps, DispatchProps
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
            <props.sortButton {...props.sortButtonProps} />
            <props.moleculeTable {...props.moleculeTableProps} />
            <props.twoDViewer {...props.twoDViewerProps} />
            <props.threeDViewer {...props.threeDViewerProps} />
            <props.backButton {...props.backButtonProps} />
            <props.nextButton {...props.nextButtonProps} />
        </props.root>
    );
}
