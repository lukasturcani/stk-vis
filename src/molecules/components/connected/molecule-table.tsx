import { connect } from 'react-redux';
import {
    moleculeTableProps,
    Molecules,
    MoleculeTableProps,
} from 'Molecules.Molecules'
import {
    MoleculeTable as MoleculeTableBase,
} from 'molecules/styled/molecule-table';

import * as Action
from 'Molecules.Action';


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
{
    return {
    };
}


export const MoleculeTable
    = connect
    (mapStateToProps, mapDispatchToProps)
    (MoleculeTableBase);
