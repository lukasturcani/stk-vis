import { connect } from 'react-redux';
import {
    sortButtonProps,
    RequestManager,
    SortButtonProps,
} from 'RequestManager.RequestManager';
import {
    SortButton as SortButtonBase,
} from 'request-manager/styled/sort-button';

import * as Action
from 'RequestManager.Action';


function mapStateToProps(
    state: RequestManager,
)
    : SortButtonProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...sortButtonProps(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
{
    return {
    };
}


export const SortButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (SortButtonBase);
