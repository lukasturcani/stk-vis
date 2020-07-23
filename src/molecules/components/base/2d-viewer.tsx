import * as React from 'react';
import {
    TwoDViewerProps
} from 'MoleculeBrowser.MoleculeBrowser';


export function TwoDViewer(
    props: TwoDViewerProps,
)
{
    return (
        <div
            style={{
                height: '10%',
                width: '10%',
                backgroundColor: 'blue',
            }}
        >
            2D Viewer
        </div>
    );
}
