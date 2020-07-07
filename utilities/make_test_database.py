import stk
import pymongo
import vabene as vb
import random
import rdkit.Chem.AllChem as rdkit


def get_molecules(num_molecules, random_seed):
    generator = random.Random(random_seed)
    for _ in range(num_molecules):
        atom_factory = vb.RandomAtomFactory(
            atoms=(
                vb.Atom(6, 0, 2),
                vb.Atom(6, 0, 2),
                vb.Atom(7, 0, 2),
                vb.Atom(8, 0, 2),
            ),
            required_atoms=(
                vb.Atom(35, 0, 1),
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
        rdkit.EmbedMolecule(molecule, rdkit.ETKDGv2())
        rdkit.Kekulize(molecule)
        yield stk.BuildingBlock.init_from_rdkit_mol(
            molecule,
            functional_groups=[stk.BromoFactory()],
        )


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


def add_entries(client, database, key_makers, random_seed):
    molecule_db = stk.MoleculeMongoDb(
        mongo_client=client,
        database=database,
        molecule_collection='molecules',
        position_matrix_collection='position_matrices',
        jsonizer=stk.MoleculeJsonizer(
            key_makers=key_makers,
        ),
    )
    num_atoms_db = stk.ValueMongoDb(
        mongo_client=client,
        collection='numAtoms',
        database=database,
        key_makers=key_makers,
    )
    num_bonds_db = stk.ValueMongoDb(
        mongo_client=client,
        collection='numBonds',
        database=database,
        key_makers=key_makers,
    )
    add_value = True
    for molecule in get_molecules(200, 5):
        molecule_db.put(molecule)
        num_bonds_db.put(molecule, molecule.get_num_bonds())
        if add_value:
            num_atoms_db.put(molecule, molecule.get_num_atoms())
        add_value ^= 1


def add_mixed_entries(
    client,
    database,
    key_makers,
):
    constructed_molecule_db = stk.ConstructedMoleculeMongoDb(
        mongo_client=client,
        database=database,
        molecule_collection='molecules',
        position_matrix_collection='position_matrices',
        jsonizer=stk.ConstructedMoleculeJsonizer(
            key_makers=key_makers,
        ),
    )
    num_atoms_db = stk.ValueMongoDb(
        mongo_client=client,
        collection='numAtoms',
        database=database,
        key_makers=key_makers,
    )
    num_bonds_db = stk.ValueMongoDb(
        mongo_client=client,
        collection='numBonds',
        database=database,
        key_makers=key_makers,
    )

    cage = stk.ConstructedMolecule(
        topology_graph=stk.cage.FourPlusSix(
            building_blocks=(
                stk.BuildingBlock(
                    smiles='BrC1C(Br)CCCC1',
                    functional_groups=[stk.BromoFactory()],
                ),
                stk.BuildingBlock(
                    smiles='Brc1cc(Br)cc(Br)c1',
                    functional_groups=[stk.BromoFactory()],
                ),
            ),
        ),
    )
    constructed_molecule_db.put(cage)
    num_atoms_db.put(cage, cage.get_num_atoms())

    macrocycle = stk.ConstructedMolecule(
        topology_graph=stk.macrocycle.Macrocycle(
            building_blocks=(
                stk.BuildingBlock(
                    smiles='BrCCBr',
                    functional_groups=[stk.BromoFactory()],
                ),
                stk.BuildingBlock(
                    smiles='BrNNBr',
                    functional_groups=[stk.BromoFactory()],
                ),
                stk.BuildingBlock(
                    smiles='BrOOBr',
                    functional_groups=[stk.BromoFactory()],
                ),
            ),
            repeating_unit='ABC',
            num_repeating_units=2,
        ),
    )
    num_atoms_db.put(macrocycle, macrocycle.get_num_atoms())

    polymer = stk.ConstructedMolecule(
        topology_graph=stk.polymer.Linear(
            building_blocks=(
                stk.BuildingBlock(
                    smiles='BrCCBr',
                    functional_groups=[stk.BromoFactory()],
                ),
                stk.BuildingBlock(
                    smiles='BrNNBr',
                    functional_groups=[stk.BromoFactory()],
                ),
            ),
            repeating_unit='AB',
            num_repeating_units=4,
        ),
    )
    rotaxane = stk.ConstructedMolecule(
        topology_graph=stk.rotaxane.NRotaxane(
            axle=stk.BuildingBlock.init_from_molecule(polymer),
            cycles=(
                stk.BuildingBlock.init_from_molecule(macrocycle),
            ),
            repeating_unit='A',
            num_repeating_units=1,
        ),
    )
    constructed_molecule_db.put(rotaxane)
    num_bonds_db.put(rotaxane, rotaxane.get_num_bonds())


def add_constructed_molecules(
    client,
    database,
    key_makers,
):
    constructed_molecule_db = stk.ConstructedMoleculeMongoDb(
        mongo_client=client,
        database=database,
        molecule_collection='molecules',
        position_matrix_collection='position_matrices',
        jsonizer=stk.ConstructedMoleculeJsonizer(
            key_makers=key_makers,
        ),
    )
    num_atoms_db = stk.ValueMongoDb(
        mongo_client=client,
        collection='numAtoms',
        database=database,
        key_makers=key_makers,
    )
    for bb1, bb2 in zip(
        get_molecules(200, 5),
        get_molecules(200, 5),
    ):
        molecule = stk.ConstructedMolecule(
            topology_graph=stk.polymer.Linear(
                building_blocks=(bb1, bb2),
                repeating_unit='AB',
                num_repeating_units=1,
            ),
        )
        constructed_molecule_db.put(molecule)
        num_atoms_db.put(molecule, molecule.get_num_atoms())
        num_atoms_db.put(bb1, bb1.get_num_atoms())


def main():
    client = pymongo.MongoClient()
    database = 'stkVis'
    client.drop_database(database)

    add_entries(
        client=client,
        database=database,
        key_makers=(
            stk.InchiKey(),
        ),
        random_seed=5,
    )
    add_entries(
        client=client,
        database=database,
        key_makers=(
            stk.Smiles(),
        ),
        random_seed=6,
    )

    database2 = 'stkVis2'
    client.drop_database(database2)
    add_mixed_entries(
        client=client,
        database=database2,
        key_makers=(
            stk.InchiKey(),
        ),
    )
    add_constructed_molecules(
        client=client,
        database=database2,
        key_makers=(
            stk.InchiKey(),
        ),
    )


if __name__ == '__main__':
    main()
