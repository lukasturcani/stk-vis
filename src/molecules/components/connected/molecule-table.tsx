import { connect } from 'react-redux';
import {
    moleculeTableProps,
    Molecules,
    MoleculeTableProps,
} from 'Molecules.Molecules'
import {
    MoleculeTable as MoleculeTableBase,
} from 'molecules/styled/molecule-table';
import {
    DispatchProps,
    CoreProps,
} from 'molecules/base/molecule-table';

import * as Action
from 'Molecules.Action';
import { selectMolecule } from 'Molecules.SelectMolecule';
import { Molecule } from 'Molecules.Molecule';


function mapStateToProps(
    state: Molecules,
)
    : MoleculeTableProps<Action.Action>
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return {
        ...moleculeTableProps
        ({
            selectMolecule: Action.selectMolecule,
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


export const MoleculeTable
    = connect
    (mapStateToProps, mapDispatchToProps)
    (
        MoleculeTableBase as
        React.FunctionComponent<CoreProps<Action.Action>>
    );
