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
} from 'molecules/base/molecule-table';

import * as Action
from 'Molecules.Action';
import { selectMolecule } from 'Molecules.SelectMolecule';
import { Molecule } from 'Molecules.Molecule';


function mapStateToProps(
    state: Molecules,
)
    : MoleculeTableProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...moleculeTableProps(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
    : DispatchProps
{
    return {
        selectMolecule:
            (selected: number, molecule: Molecule) => dispatch(
                Action.selectMolecule(
                    selectMolecule(selected)(molecule)
                )
            ),
    };
}


export const MoleculeTable
    = connect
    (mapStateToProps, mapDispatchToProps)
    (MoleculeTableBase);
