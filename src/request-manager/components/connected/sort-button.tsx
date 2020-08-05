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
    DispatchProps
} from 'request-manager/base/sort-button';

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
    : DispatchProps
{
    return {
        setSortedCollection:
            (
                sortType: 'ascending' | 'descending',
                collection: string,
            ) => { console.log(sortType, collection) },
    };
}


export const SortButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (SortButtonBase);
