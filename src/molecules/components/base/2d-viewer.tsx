import * as React from 'react';
import * as smilesDrawer from 'smiles-drawer';
import { elementColors } from './element-colors';
import {
    TwoDViewerProps
} from 'Molecules.Molecules';

interface Props extends TwoDViewerProps
{
    container: React.FunctionComponent<Record<string, unknown>>;
    canvas: React.FunctionComponent<CanvasProps>;
}


export interface CanvasProps
{
    id: string;
}

export function TwoDViewer(
    props: Props,
)
{
    React.useEffect(() => {
        const viewer = document.getElementById('TwoDViewer');
        // Remove the content of the rendering container. It's
        // only there to force the rendering of a new molecule.
        (viewer as any).innerHTML = '';

        const drawer: any
            = new smilesDrawer.Drawer({
                bondThickness: 2,
                width: (viewer as HTMLElement).clientWidth,
                height: (viewer as HTMLElement).clientHeight,
                themes: {
                    dark: elementColors,
                },
            });

        smilesDrawer.parse(
            props.value0.smiles,
            (tree: any) => {
                drawer.draw(
                    tree,
                    'TwoDViewer',
                    'dark',
                    false,
                );
            },
            (err: any) => {
                console.log(err);
            },
        );

    });
    return (
        <props.container>
            <props.canvas
                id={'TwoDViewer'}
            >
                {
                    // Use the selected molecule as the div content, so
                    // that the div is forced to re-render when the
                    // selected molecule changes. If this is not the case,
                    // the rendered molecule does not change, even when a
                    // new molecule is selected.
                    props.value0.smiles
                }
            </props.canvas>
        </props.container>
    );
}
