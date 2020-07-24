import * as React from 'react';
import {
    ContainerProps,
    ThreeDViewer as ThreeDViewerBase,
} from 'molecules/base/3d-viewer';
import {
    ThreeDViewerProps,
} from 'Molecules.Molecules'


export const ThreeDViewer: React.FunctionComponent<ThreeDViewerProps>
    = (props) => <ThreeDViewerBase
        container={Container}
        {...props}
    />;


const Container: React.FunctionComponent<ContainerProps>
    = (props) => (
        <div
            style={{
                height: '100%',
                width: '100%',
            }}
            {...props}
        >
            {props.children}
        </div>
    );
