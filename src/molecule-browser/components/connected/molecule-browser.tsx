import { connect } from 'react-redux';
import {
    props,
    MoleculeBrowser,
} from 'MoleculeBrowser.MoleculeBrowser';

import {
    Props as MoleculeBrowserProps,
} from 'MoleculeBrowser.MoleculeBrowser'
import {
    MoleculeBrowser as MoleculeBrowserBase,
} from 'molecule-browser/styled/molecule-browser';

import * as Action
from 'MoleculeBrowser.Action';


function mapStateToProps(
    state: MoleculeBrowser,
)
    : MoleculeBrowserProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...props(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
{
    return {
    };
}


export const MoleculeBrowser
    = connect
    (mapStateToProps, mapDispatchToProps)
    (MoleculeBrowserBase);
