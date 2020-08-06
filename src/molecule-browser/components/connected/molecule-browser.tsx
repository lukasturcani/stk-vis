import { connect } from 'react-redux';
import {
    props,
    MoleculeBrowser as State,
} from 'MoleculeBrowser.MoleculeBrowser';

import {
    Props as MoleculeBrowserProps,
} from 'MoleculeBrowser.MoleculeBrowser'
import {
    MoleculeBrowser as MoleculeBrowserBase,
} from 'molecule-browser/styled/molecule-browser';

import * as Action
from 'MoleculeBrowser.Action';
import {
    ascending,
    descending,
} from 'RequestManager.SortType';
import { Molecule } from 'Molecules.Molecule';
import {
    RequestResult,
} from 'RequestManager.RequestResult';


function mapStateToProps<a>(
    state: State,
)
    : MoleculeBrowserProps<a>
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...props()(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
{
    return {
        dispatch: {
            selectMolecule:
                (selected: number, molecule: Molecule) => dispatch(
                    Action.selectMolecule_(selected)(molecule)
                ),
            handleResult:
                (result: RequestResult) => console.log(result),
            setSortedCollection:
                (
                    sortType: 'ascending' | 'descending',
                    collection: string,
                ) =>
                {
                    if (collection === '')
                    {
                        dispatch(Action.setUnsorted_);
                    }
                    else
                    {
                        dispatch(
                            Action.setSorted_
                                (collection)
                                (
                                    sortType === 'ascending'?
                                    ascending : descending
                                )
                        );
                    }
                },
        },
    };
}


export const MoleculeBrowser
    = connect
    (mapStateToProps, mapDispatchToProps)
    (MoleculeBrowserBase);
