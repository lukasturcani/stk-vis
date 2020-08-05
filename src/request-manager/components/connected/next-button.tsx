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
import {
    all,
} from 'SelectingCollection';


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
        handleResult: result => console.log(
            all(result.value0.value0.molecules)
        ),
    };
}


export const NextButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (NextButtonBase);
