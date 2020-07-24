import * as React from 'react';
import {
    TwoDViewer as TwoDViewerBase,
    CanvasProps,
} from 'molecules/base/2d-viewer';
import {
    TwoDViewerProps,
} from 'Molecules.Molecules'


export const TwoDViewer: React.FunctionComponent<TwoDViewerProps>
    = (props) => <TwoDViewerBase
        canvas={Canvas}
        {...props}
    />;


const Canvas: React.FunctionComponent<CanvasProps>
    = (props) => (
        <canvas
            {...props}
        >
            {props.children}
        </canvas>
    );
