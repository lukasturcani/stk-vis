import * as React from 'react';
import { MoleculeTable } from '../features/MoleculeTable';
import { NextButton } from '../features/NextButton';

export const DatabaseBrowser = () => (
    <div>
        <MoleculeTable.components.MoleculeTable />
        <NextButton.components.NextButton />
    </div>
);
