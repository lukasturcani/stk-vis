import * as React from 'react';
import {
    ThreeDViewer as ThreeDViewerBase,
} from 'molecules/base/3d-viewer';
import {
    ThreeDViewerProps,
} from 'MoleculeBrowser.MoleculeBrowser'


export const ThreeDViewer: React.FunctionComponent<ThreeDViewerProps>
    = (props) => <ThreeDViewerBase
        {...props}
    />;