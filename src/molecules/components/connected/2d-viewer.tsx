import { connect } from 'react-redux';
import {
    twoDViewerProps,
    Molecules,
    TwoDViewerProps,
} from 'Molecules.Molecules';
import {
    TwoDViewer as TwoDViewerBase,
} from 'molecules/styled/2d-viewer';

import * as Action
from 'Molecules.Action';


function mapStateToProps(
    state: Molecules,
)
    : TwoDViewerProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...twoDViewerProps(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
{
    return {
    };
}


export const TwoDViewer
    = connect
    (mapStateToProps, mapDispatchToProps)
    (TwoDViewerBase);
