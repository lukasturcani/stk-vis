import { connect } from 'react-redux';
import {
    props,
    IMoleculeBrowser,
} from 'MoleculeBrowser.MoleculeBrowser';

import {
    BaseProps,
    DispatchProps,
} from 'molecule-browser/base/molecule-browser';
import {
    MoleculeBrowser as MoleculeBrowserBase,
} from 'molecule-browser/styled/molecule-browser';

import * as Action
from 'MoleculeBrowser.Action';


function mapStateToProps(
    state: IMoleculeBrowser,
)
    : BaseProps
{
    return props(state).value0;
}


function mapDispatchToProps(
    dispatch: (action: Action.IAction) => void,
)
    : DispatchProps
{
    return {
    };
}


export const MoleculeBrowser
    = connect
    (mapStateToProps, mapDispatchToProps)
    (MoleculeBrowserBase);
