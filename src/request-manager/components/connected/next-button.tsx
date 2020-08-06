import { connect } from 'react-redux';
import {
    nextButtonProps,
    RequestManager,
    NextButtonProps,
} from 'RequestManager.RequestManager';
import {
    NextButton as NextButtonBase,
} from 'request-manager/styled/next-button';
import {
    DispatchProps,
    CoreProps,
} from 'request-manager/base/next-button';

import * as Action
from 'RequestManager.Action';


function mapStateToProps(
    state: RequestManager,
)
    : NextButtonProps<Action.Action>
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return {
        ...nextButtonProps
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


export const NextButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (
        NextButtonBase as
        React.FunctionComponent<CoreProps<Action.Action>>
    );
