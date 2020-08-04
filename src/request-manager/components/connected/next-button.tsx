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
} from 'request-manager/base/next-button';

import * as Action
from 'RequestManager.Action';


function mapStateToProps(
    state: RequestManager,
)
    : NextButtonProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...nextButtonProps(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
    : DispatchProps
{
    return {
        handleResult: result => console.log(result),
    };
}


export const NextButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (NextButtonBase);
