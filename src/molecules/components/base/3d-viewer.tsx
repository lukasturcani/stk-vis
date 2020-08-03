import * as React from 'react';
import {
    ThreeDViewerProps,
} from 'Molecules.Molecules';
import * as md from 'mol-draw';
import { useTheme } from '@material-ui/core/styles';

interface Props extends ThreeDViewerProps
{
    container: React.FunctionComponent<Record<string, unknown>>;
    canvas: React.FunctionComponent<CanvasProps>;
}

export interface CanvasProps
{
    id: string;
}

// The scene getter will get constructed after the DOM is rendered.
// However a global variable is kept, because only a single scene
// getter should ever get created. This is because a given scene getter
// always returns the same scene, and only one scene should ever get
// made by stkVis.
let getScene: any = undefined;

export function ThreeDViewer(
    props: Props,
)
{
    const theme = useTheme();
    React.useEffect(() => {
        const viewer = document.getElementById('ThreeDViewer');
        // Remove the content of the rendering container. It's
        // only there to force the rendering of a new molecule.
        (viewer as any).innerHTML = '';


        if (getScene === undefined)
        {
            getScene = md.scene({
                containerId: 'ThreeDViewer',

                backgroundColor:
                    theme.palette.background.paper,
            });
        }

        const scene = getScene(props.value0.meshes);
        // The container of the Scene may change across
        // React renders, make sure that it is always updated.
        scene.userData.container = viewer;
        (viewer as any).appendChild(
            scene.userData.renderer.domElement
        );
        md.drawMol(scene);
    });
    return (
        <props.container>
            <props.canvas
                id={'ThreeDViewer'}
            >
            {
                // Use the selected molecule as the div content, so
                // that the div is forced to re-render when the
                // selected molecule changes. If this is not the case,
                // the rendered molecule does not change, even when a
                // new molecule is selected.
            }
            </props.canvas>
        </props.container>
    );
}
