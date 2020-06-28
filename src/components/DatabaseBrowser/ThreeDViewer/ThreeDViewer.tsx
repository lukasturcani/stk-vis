import * as React from 'react';
import { connect } from 'react-redux';
import * as md from 'mol-draw';
import { useTheme } from '@material-ui/core/styles';
import {
    ILoadedDatabaseBrowser,
} from '../../../models';
import {
    getColumnValues,
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

                md.drawMol({
                })({
                    backgroundColor: theme.palette.background.paper,
                    containerId: 'ThreeDViewer',
                })(geometryData);
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
