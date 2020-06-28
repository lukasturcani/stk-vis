import * as React from 'react';
import { connect } from 'react-redux';
import * as md from 'mol-draw';
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
    maybeMolecule: Maybe<any>
}


function ThreeDViewer(props: IThreeDViewerProps)
{
    switch (props.maybeMolecule.kind)
    {
        case MaybeKind.Nothing:
            break;
        case MaybeKind.Just:
            const geometryData
                = md.fromRight()(props.maybeMolecule.value);
            React.useEffect(() => {
                md.drawMol({
                })({
                    containerId: 'ThreeDViewer'
                })(geometryData);
            });
            break;
        default:
            assertNever(props.maybeMolecule);
    }

    return (<div id='ThreeDViewer'
        style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'red',
        }}
    ></div>);
}


function mapStateToProps(state: ILoadedDatabaseBrowser)
{
    const selectedMolecule: number
        = getSelectedMolecule(state);

    return {
        maybeMolecule: maybeMolDrawMolecule(
            getMolecules(state)[selectedMolecule],
        ),
    }
}



export const ThreeDViewerComponent
    = connect(mapStateToProps)(ThreeDViewer);
