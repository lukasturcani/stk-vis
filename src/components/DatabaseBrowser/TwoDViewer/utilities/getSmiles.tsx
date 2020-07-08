import {
    Maybe,
    Just,
    Nothing,
    MaybeKind,
} from '../../../../utilities';
import {
    IMolecule,
} from '../../../../models';
import  * as chemlib from 'openchemlib/minimal';


export function getSmiles(molecule: IMolecule): Maybe<string>
{
    const chemlibMolecule
        = new chemlib.Molecule(
            molecule.atoms.length,
            molecule.bonds.length,
        );

    const atoms: any[]
        = [];

    for (const [atomicNumber] of molecule.atoms)
    {
        atoms.push(chemlibMolecule.addAtom(atomicNumber));
    }
    for (const [atom1Id, atom2Id, order] of molecule.bonds)
    {
        chemlibMolecule.addOrChangeBond(
            atom1Id,
            atom2Id,
            order,
        );
    }

    return new Just(chemlibMolecule.toSmiles());
}
