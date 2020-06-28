import {
    Maybe,
    Just,
    Nothing,
    MaybeKind,
} from '../../../../utilities';
import {
    IMolecule,
} from '../../../../models';
import * as Kekule from 'kekule';


export function getSmiles(molecule: IMolecule): Maybe<string>
{
    const kekuleMolecule: any
        = new Kekule.Molecule();

    const atoms: any[]
        = [];

    for (const [atomicNumber] of molecule.atoms)
    {
        atoms.push(kekuleMolecule.appendAtom(atomicNumber));
    }
    for (const [atom1Id, atom2Id, order] of molecule.bonds)
    {
        kekuleMolecule.appendBond(
            [atoms[atom1Id], atoms[atom2Id]],
            order
        );
    }

    return new Just(Kekule.IO.saveFormatData(kekuleMolecule, 'smi'));
}
