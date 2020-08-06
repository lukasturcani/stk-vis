import { connect } from 'react-redux';
import {
    backButtonProps,
    RequestManager,
    BackButtonProps,
} from 'RequestManager.RequestManager';
import {
    BackButton as BackButtonBase,
} from 'request-manager/styled/back-button';

import * as Action
from 'RequestManager.Action';
import {
    DispatchProps,
} from 'request-manager/base/back-button';


function mapStateToProps(
    state: RequestManager,
)
    : BackButtonProps<Action.Action>
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return {
        ...backButtonProps
        (Action.updateMoleculePage)
        (state)
    };
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
    : DispatchProps<Action.Action>
{
    return { dispatch };
}

export const BackButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (BackButtonBase);
