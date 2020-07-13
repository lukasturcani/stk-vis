import * as md from 'mol-draw';
import {
    IMolecule,
    IBond,
} from '../../../../models';
import { getChemicalSymbol } from './getChemicalSymbol';
import {
    Maybe,
    Just,
    Nothing,
    MaybeKind,
} from 'maybe';

type number3 = [number, number, number];


function assertNever(arg: never): never { throw Error(); }


export function maybeMolDrawMolecule(
    molecule: IMolecule,
)
    : Maybe<any>
{
    const atoms = [];
    for (let index: number = 0; index < molecule.atoms.length; ++index)
    {
        const atomicNumber = molecule.atoms[index].atomicNumber;
        const [x,y,z] = molecule.positionMatrix[index];
        const chemicalSymbol: Maybe<any>
            = getChemicalSymbol(atomicNumber);

        switch (chemicalSymbol.kind)
        {
            case MaybeKind.Nothing:
                return new Nothing();

            case MaybeKind.Just:
                atoms.push(
                    md.atom
                        ( chemicalSymbol.value )
                        ( md.position(x)(y)(z) )
                );
                break;

            default:
                assertNever(chemicalSymbol);
        }
    }

    const bonds = molecule.bonds.map(
        ({atom1Id, atom2Id, order}: IBond) => {
            return md.bond(order)(atom1Id)(atom2Id);
    });

    return new Just(md.maybeMolecule(atoms)(bonds));
}
