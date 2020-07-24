import * as React from 'react';
import {
    MoleculeTable as MoleculeTableBase,
} from 'molecules/base/molecule-table';
import {
    MoleculeTableProps,
} from 'Molecules.Molecules'


export const MoleculeTable: React.FunctionComponent<MoleculeTableProps>
    = (props) => <MoleculeTableBase
        {...props}
    />;
