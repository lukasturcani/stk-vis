import stk
import pymongo
import vabene as vb
import random
import rdkit.Chem.AllChem as rdkit


def get_molecules(num_molecules):
    generator = random.Random(5)
    for _ in range(num_molecules):
        atom_factory = vb.RandomAtomFactory(
            atoms=(
                vb.Atom(6, 0, 4),
                vb.Atom(6, 0, 3),
                vb.Atom(7, 0, 3),
                vb.Atom(8, 0, 2),
            ),
            num_atoms=generator.randint(7, 16),
            random_seed=generator.randint(0, 1000),
        )
        atoms = tuple(atom_factory.get_atoms())
        bond_factory = vb.RandomBondFactory(
            random_seed=generator.randint(0, 1000),
        )
        bonds = bond_factory.get_bonds(atoms)
        molecule = with_hydrogens(vb.Molecule(atoms, bonds))
        rdkit.Compute2DCoords(molecule)
        rdkit.Kekulize(molecule)
        yield stk.BuildingBlock.init_from_rdkit_mol(molecule)


def with_hydrogens(molecule):
    rdkit_molecule = rdkit.EditableMol(rdkit.Mol())
    for atom in molecule.get_atoms():
        rdkit_atom = rdkit.Atom(atom.get_atomic_number())
        rdkit_atom.SetFormalCharge(atom.get_charge())
        rdkit_molecule.AddAtom(rdkit_atom)

    for bond in molecule.get_bonds():
        rdkit_molecule.AddBond(
            beginAtomIdx=bond.get_atom1_id(),
            endAtomIdx=bond.get_atom2_id(),
            order=rdkit.BondType(bond.get_order()),
        )
    rdkit_molecule = rdkit_molecule.GetMol()
    rdkit.SanitizeMol(rdkit_molecule)
    return rdkit.AddHs(rdkit_molecule)


def main():
    client = pymongo.MongoClient()
    database = 'stkVis'
    molecule_db = stk.MoleculeMongoDb(
        mongo_client=client,
        database=database,
        molecule_collection='molecules',
        position_matrix_collection='position_matrices',
    )
    num_atoms_db = stk.ValueMongoDb(
        mongo_client=client,
        collection='numAtoms',
        database=database,
    )
    add_value = True
    for molecule in get_molecules(50):
        molecule_db.put(molecule)
        if add_value:
            num_atoms_db.put(molecule, molecule.get_num_atoms())
        add_value ^= 1


if __name__ == '__main__':
    main()
