import { connect } from 'react-redux';
import {
    sortButtonProps,
    RequestManager,
    SortButtonProps,
} from 'RequestManager.RequestManager';
import {
    SortButton as SortButtonBase,
} from 'request-manager/styled/sort-button';
import {
    DispatchProps,
    CoreProps,
} from 'request-manager/base/sort-button';

import * as Action
from 'RequestManager.Action';
import {
    setUnsorted,
    setUnsorted as setUnsortedPayload
} from 'RequestManager.SetUnsorted';
import {
    setSorted,
    setSorted as setSortedPayload
} from 'RequestManager.SetSorted';
import {
    ascending,
    descending,
} from 'RequestManager.SortType';


function mapStateToProps(
    state: RequestManager,
)
    : SortButtonProps<Action.Action>
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return {
        ...sortButtonProps
        ({
            setSorted: Action.setSorted,
            setUnsorted: Action.setUnsorted,
        })
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


export const SortButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (
        SortButtonBase as
        React.FunctionComponent<CoreProps<Action.Action>>
    );
