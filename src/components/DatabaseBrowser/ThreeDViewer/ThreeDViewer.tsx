import * as React from 'react';
import { connect } from 'react-redux';
import * as md from 'mol-draw';
import { useTheme } from '@material-ui/core/styles';
import {
    ILoadedDatabaseBrowser,
} from '../../../models';
import {
    getMolecules,
    getSelectedMolecule,
} from '../../../selectors';
import {
    Maybe,
    MaybeKind,
} from '../../../utilities';
import {
    maybeMolDrawMolecule,
} from './utilities';


function assertNever(arg: never): never { throw Error(); }


interface IThreeDViewerProps
{
    maybeMolecule: Maybe<any>;
    selectedMolecule: number;
}

// The scene getter will get constructed after the DOM is rendered.
// However a global variable is kept, because only a single scene
// getter should ever get created. This is because a given scene getter
// always returns the same scene, and only one scene should ever get
// made by stkVis.
let getScene: any = undefined;


function ThreeDViewer(props: IThreeDViewerProps)
{
    switch (props.maybeMolecule.kind)
    {
        case MaybeKind.Nothing:
            break;

        case MaybeKind.Just:
            const theme = useTheme();

            const geometryData
                = md.fromRight()(props.maybeMolecule.value);
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

                setTimeout(() => {
                    const meshes
                        = md.meshes({})(geometryData);

                    const scene = getScene(meshes);
                    // The container of the Scene may change across
                    // React renders, make sure that it is always updated.
                    scene.userData.container = viewer;
                    (viewer as any).appendChild(
                        scene.userData.renderer.domElement
                    );
                    md.drawMol(scene);
                });

            });
            break;

        default:
            assertNever(props.maybeMolecule);
    }

    return (<div
        id={ 'ThreeDViewer' }
        style={{
            height: '100%',
            width: '100%',
        }}
    // Use the selected molecule as the div content, so that the div
    // is forced to re-render when the selected molecule changes.
    // If this is not the case, the rendered molecule does not change,
    // even when a new molecule is selected.
    >{ props.selectedMolecule }</div>);
}


function mapStateToProps(state: ILoadedDatabaseBrowser)
{
    const selectedMolecule: number
        = getSelectedMolecule(state);

    return {
        maybeMolecule: maybeMolDrawMolecule(
            getMolecules(state)[selectedMolecule],
        ),
        selectedMolecule: selectedMolecule,
    }
}



export const ThreeDViewerComponent
    = connect(mapStateToProps)(ThreeDViewer);
