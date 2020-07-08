import * as React from 'react';
import { connect } from 'react-redux';
import * as smilesDrawer from 'smiles-drawer';
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
    getSmiles,
    elementColors,
} from './utilities';


function assertNever(arg: never): never { throw Error(); }


interface IThreeDViewerProps
{
    smiles: Maybe<string>;
    selectedMolecule: number;
}


function TwoDViewer(props: IThreeDViewerProps)
{
    switch (props.smiles.kind)
    {
        case MaybeKind.Nothing:
            break;

        case MaybeKind.Just:
            const theme = useTheme();

            const smiles: string = props.smiles.value;

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
                    smiles,
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
            break;

        default:
            assertNever(props.smiles);
    }

    return (
        <canvas
            id={ 'TwoDViewer' }
            style={{
                height: '100%',
                width: '100%',
            }}
            // Use the selected molecule as the div content, so that
            // the div is forced to re-render when the selected
            // molecule changes. If this is not the case, the rendered
            // molecule does not change, even when a new molecule is
            // selected.
        >
            { props.selectedMolecule }
        </canvas>
    );
}


function mapStateToProps(state: ILoadedDatabaseBrowser)
{
    const selectedMolecule: number
        = getSelectedMolecule(state);

    return {
        smiles: getSmiles(getMolecules(state)[selectedMolecule]),
        selectedMolecule: selectedMolecule,
    }
}



export const TwoDViewerComponent
    = connect(mapStateToProps)(TwoDViewer);
