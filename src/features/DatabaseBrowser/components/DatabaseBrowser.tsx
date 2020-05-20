import MoleculeTable from '../features/MoleculeTable';
import NextButton from '../features/NextButton';
import PreviousButton from '../features/PreviousButton';

export const DatabaseBrowser = () => (
    <div>
        <MoleculeTable />
        <NextButton />
        <PreviousButton />
    </div>
);
