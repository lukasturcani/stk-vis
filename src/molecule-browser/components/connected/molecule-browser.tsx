import { connect } from 'react-redux';
import {
    props,
    IMoleculeBrowser,
} from 'MoleculeBrowser.MoleculeBrowser';

import {
    MoleculeBrowserProps,
} from 'MoleculeBrowser.MoleculeBrowser'
import {
    MoleculeBrowser as MoleculeBrowserBase,
} from 'molecule-browser/styled/molecule-browser';

import * as Action
from 'MoleculeBrowser.Action';


function mapStateToProps(
    state: IMoleculeBrowser,
)
    : MoleculeBrowserProps
{
    return props(state);
}


function mapDispatchToProps(
    dispatch: (action: Action.IAction) => void,
)
{
    return {
    };
}


export const MoleculeBrowser
    = connect
    (mapStateToProps, mapDispatchToProps)
    (MoleculeBrowserBase);
