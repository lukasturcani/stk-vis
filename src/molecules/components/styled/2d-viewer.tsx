import * as React from 'react';
import {
    TwoDViewer as TwoDViewerBase,
} from 'molecules/base/2d-viewer';
import {
    TwoDViewerProps,
} from 'MoleculeBrowser.MoleculeBrowser'


export const TwoDViewer: React.FunctionComponent<TwoDViewerProps>
    = (props) => <TwoDViewerBase
        {...props}
    />;
