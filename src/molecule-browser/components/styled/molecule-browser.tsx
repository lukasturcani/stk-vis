import * as React from 'react';

import {
    MoleculeBrowserProps,
} from 'MoleculeBrowser.MoleculeBrowser'
import {
    MoleculeBrowser as MoleculeBrowserBase
} from 'molecule-browser/base/molecule-browser';

import {
    SortButton,
} from 'request-manager/styled/sort-button';
import {
    MoleculeTable,
} from 'molecules/styled/molecule-table';
import {
    TwoDViewer,
} from 'molecules/styled/2d-viewer';
import {
    ThreeDViewer,
} from 'molecules/styled/3d-viewer';
import {
    BackButton,
} from 'request-manager/styled/back-button';
import {
    NextButton,
} from 'request-manager/styled/next-button';


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