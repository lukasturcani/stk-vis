import stk
import rdkit.Chem.AllChem as rdkit
import pymongo
import getpass


def etkdg(molecule):
    rdkit_molecule = molecule.to_rdkit_mol()
    rdkit.EmbedMolecule(rdkit_molecule, rdkit.ETKDGv2())
    return molecule.with_position_matrix(
        position_matrix=rdkit_molecule.GetConformer().GetPositions(),
    )


def uff(molecule):
    rdkit_molecule = molecule.to_rdkit_mol()
    rdkit.SanitizeMol(rdkit_molecule)
    rdkit.UFFOptimizeMolecule(rdkit_molecule)
    return molecule.with_position_matrix(
        position_matrix=rdkit_molecule.GetConformer().GetPositions(),
    )


def uff_energy(molecule):
    rdkit_molecule = molecule.to_rdkit_mol()
    rdkit.SanitizeMol(rdkit_molecule)
    ff = rdkit.UFFGetMoleculeForceField(rdkit_molecule)
    return ff.CalcEnergy()


def main():
    username = input('Username: ')
    password = getpass.getpass()

    client = pymongo.MongoClient(
        f'mongodb+srv://{username}:{password}@stk-vis-example.x4bkl.'
        'mongodb.net/stk?retryWrites=true&w=majority'
    )
    database = 'stk'
    client.drop_database(database)

    constructed_db = stk.ConstructedMoleculeMongoDb(client, database)
    atoms_db = stk.ValueMongoDb(client, 'Num Atoms')
    bonds_db = stk.ValueMongoDb(client, 'Num Bonds')
    energy_db = stk.ValueMongoDb(client, 'UFF Energy')

    macrocycle = uff(stk.ConstructedMolecule(
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
    ))
    atoms_db.put(macrocycle, macrocycle.get_num_atoms())
    bonds_db.put(macrocycle, macrocycle.get_num_bonds())
    energy_db.put(macrocycle, uff_energy(macrocycle))
    constructed_db.put(macrocycle)

    polymer = uff(stk.ConstructedMolecule(
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
    ))
    atoms_db.put(polymer, polymer.get_num_atoms())
    bonds_db.put(polymer, polymer.get_num_bonds())
    energy_db.put(polymer, uff_energy(polymer))
    constructed_db.put(polymer)

    rotaxane = uff(stk.ConstructedMolecule(
        topology_graph=stk.rotaxane.NRotaxane(
            axle=stk.BuildingBlock.init_from_molecule(polymer),
            cycles=(
                stk.BuildingBlock(
                    smiles=(
                        'C1=CC2=CC3=CC=C(N3)C=C4C=CC(=N4)'
                        'C=C5C=CC(=N5)C=C1N2'
                    ),
                ),
            ),
            repeating_unit='A',
            num_repeating_units=1,
        ),
    ))
    atoms_db.put(rotaxane, rotaxane.get_num_atoms())
    bonds_db.put(rotaxane, rotaxane.get_num_bonds())
    energy_db.put(rotaxane, uff_energy(rotaxane))
    constructed_db.put(rotaxane)

    kagome = uff(stk.ConstructedMolecule(
        topology_graph=stk.cof.Honeycomb(
            building_blocks=(
                stk.BuildingBlock('BrC=CBr', [stk.BromoFactory()]),
                stk.BuildingBlock(
                    smiles='Brc1cc(Br)cc(Br)c1',
                    functional_groups=[stk.BromoFactory()],
                ),
            ),
            lattice_size=(2, 2, 1)
        ),
    ))
    atoms_db.put(kagome, kagome.get_num_atoms())
    bonds_db.put(kagome, kagome.get_num_bonds())
    energy_db.put(kagome, uff_energy(kagome))
    constructed_db.put(kagome)

    cc3 = stk.ConstructedMolecule(
        topology_graph=stk.cage.FourPlusSix(
            building_blocks=(
                stk.BuildingBlock(
                    smiles='NC1CCCCC1N',
                    functional_groups=[stk.PrimaryAminoFactory()],
                ),
                stk.BuildingBlock(
                    smiles='O=Cc1cc(C=O)cc(C=O)c1',
                    functional_groups=[stk.AldehydeFactory()],
                ),
            ),
        ),
    )
    cc3 = uff(cc3)
    atoms_db.put(cc3, cc3.get_num_atoms())
    bonds_db.put(cc3, cc3.get_num_bonds())
    energy_db.put(cc3, uff_energy(cc3))
    constructed_db.put(cc3)


if __name__ == '__main__':
    main()
