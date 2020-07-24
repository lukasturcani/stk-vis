import { connect } from 'react-redux';
import {
    threeDViewerProps,
    IMolecules,
    ThreeDViewerProps,
} from 'Molecules.Molecules'
import {
    ThreeDViewer as ThreeDViewerBase,
} from 'molecules/styled/3d-viewer';

import * as Action
from 'Molecules.Action';


function mapStateToProps(
    state: IMolecules,
)
    : ThreeDViewerProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...threeDViewerProps(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.IAction) => void,
)
{
    return {
    };
}


export const ThreeDViewer
    = connect
    (mapStateToProps, mapDispatchToProps)
    (ThreeDViewerBase);
