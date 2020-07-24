import { connect } from 'react-redux';
import {
    backButtonProps,
    IRequestManager,
    BackButtonProps,
} from 'RequestManager.RequestManager';
import {
    BackButton as BackButtonBase,
} from 'request-manager/styled/back-button';

import * as Action
from 'RequestManager.Action';


function mapStateToProps(
    state: IRequestManager,
)
    : BackButtonProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...backButtonProps(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.IAction) => void,
)
{
    return {
    };
}


export const BackButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (BackButtonBase);
