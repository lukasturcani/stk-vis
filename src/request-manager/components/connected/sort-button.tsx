import { connect } from 'react-redux';
import {
    sortButtonProps,
    IRequestManager,
    SortButtonProps,
} from 'RequestManager.RequestManager';
import {
    SortButton as SortButtonBase,
} from 'request-manager/styled/sort-button';

import * as Action
from 'RequestManager.Action';


function mapStateToProps(
    state: IRequestManager,
)
    : SortButtonProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...sortButtonProps(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.IAction) => void,
)
{
    return {
    };
}


export const SortButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (SortButtonBase);
