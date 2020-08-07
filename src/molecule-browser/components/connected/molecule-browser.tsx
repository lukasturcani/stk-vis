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

import {
    DispatchProps,
    CoreProps
} from 'molecule-browser/base/molecule-browser';

import * as Action from 'MoleculeBrowser.Action';
import {
    UpdateMoleculePage,
} from 'RequestManager.UpdateMoleculePage';
import { SetSorted } from 'RequestManager.SetSorted';
import { SetUnsorted } from 'RequestManager.SetUnsorted';
import { SelectMolecule } from 'Molecules.SelectMolecule';


function mapStateToProps<a>(
    state: State,
)
    : MoleculeBrowserProps<Action.Action>
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return {
        ...props
        ({
            updateMoleculePage:
                (payload: UpdateMoleculePage) =>
                    Action.updateMoleculePage(payload),

            setSorted:
                (payload: SetSorted) =>
                    Action.setSorted(payload),

            setUnsorted:
                (payload: SetUnsorted) =>
                    Action.setUnsorted(payload),

            selectMolecule:
                (payload: SelectMolecule) =>
                    Action.selectMolecule(payload),
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


export const MoleculeBrowser
    = connect
    (mapStateToProps, mapDispatchToProps)
    (
        MoleculeBrowserBase as
        React.FunctionComponent<CoreProps<Action.Action>>
    );
