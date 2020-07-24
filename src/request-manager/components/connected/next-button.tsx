import { connect } from 'react-redux';
import {
    nextButtonProps,
    IRequestManager,
    NextButtonProps,
} from 'RequestManager.RequestManager';
import {
    NextButton as NextButtonBase,
} from 'request-manager/styled/next-button';

import * as Action
from 'RequestManager.Action';


function mapStateToProps(
    state: IRequestManager,
)
    : NextButtonProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...nextButtonProps(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.IAction) => void,
)
{
    return {
    };
}


export const NextButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (NextButtonBase);
