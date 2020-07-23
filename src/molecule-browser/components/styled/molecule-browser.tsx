import * as React from 'react';

import {
    MoleculeBrowserProps,
} from 'MoleculeBrowser.MoleculeBrowser'
import {
    MoleculeBrowser as MoleculeBrowserBase
} from 'molecule-browser/base/molecule-browser';

import {
    SortButton,
} from 'molecule-browser/styled/sort-button';
import {
    MoleculeTable,
} from 'molecule-browser/styled/molecule-table';
import {
    TwoDViewer,
} from 'molecule-browser/styled/2d-viewer';
import {
    ThreeDViewer,
} from 'molecule-browser/styled/3d-viewer';
import {
    BackButton,
} from 'molecule-browser/styled/back-button';
import {
    NextButton,
} from 'molecule-browser/styled/next-button';


export function MoleculeBrowser(
    props: MoleculeBrowserProps,
)
{
    return <MoleculeBrowserBase
        root={Root}
        sortButton={SortButton}
        moleculeTable={MoleculeTable}
        twoDViewer={TwoDViewer}
        threeDViewer={ThreeDViewer}
        backButton={BackButton}
        nextButton={NextButton}
        {...props}
    />;
}


const Root: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <div
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'red',
            }}
        >
            ROOT
            {props.children}
        </div>
    );
