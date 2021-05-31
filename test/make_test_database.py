import stk
import pymongo
from typing import Iterable
import itertools


class ConstructedMoleculeCreator:
    def __init__(self):
        self._num_molecules = 0

    def get_molecules(self) -> Iterable[stk.ConstructedMolecule]:

        while True:
            self._num_molecules + 1
            bb1 = stk.BuildingBlock(
                smiles=f'Br{"C"*self._num_molecules}Br',
                functional_groups=[stk.BromoFactory()],
            )
            bb2 = stk.BuildingBlock(
                smiles=f'Br{"N"*self._num_molecules}Br',
                functional_groups=[stk.BromoFactory()],
            )
            yield stk.ConstructedMolecule(
                topology_graph=stk.polymer.Linear(
                    building_blocks=(bb1, bb2),
                    repeating_unit='AB',
                    num_repeating_units=2,
                ),
            )


def build_database_1():
    constructed_molecule_db = stk.ConstructedMoleculeMongoDb(
        mongo_client=pymongo.MongoClient(),
        database='stk-vis-test-database-1',
        molecule_collection='molecules',
        constructed_molecule_collection='constructed_molecules',
        position_matrix_collection='position_matrices',
        building_block_position_matrix_collection=(
            'building_block_position_matrices'
        ),
    )

    molecule_creator = ConstructedMoleculeCreator()
    for molecule in itertools.islice(
        molecule_creator.get_molecules(),
        40,
    ):
        constructed_molecule_db.put(molecule)


def build_database_2():
    constructed_molecule_db_1 = stk.ConstructedMoleculeMongoDb(
        mongo_client=pymongo.MongoClient(),
        database='stk-vis-test-database-2',
        molecule_collection='molecules',
        constructed_molecule_collection='constructed_molecules',
        position_matrix_collection='position_matrices',
        building_block_position_matrix_collection=(
            'building_block_position_matrices'
        ),
    )

    molecule_creator = ConstructedMoleculeCreator()
    for molecule in itertools.islice(
        molecule_creator.get_molecules(),
        20,
    ):
        constructed_molecule_db_1.put(molecule)

    constructed_molecule_db_2 = stk.ConstructedMoleculeMongoDb(
        mongo_client=pymongo.MongoClient(),
        database='stk-vis-test-database-3',
        molecule_collection='molecules',
        constructed_molecule_collection='constructed_molecules',
        position_matrix_collection='position_matrices_2',
        building_block_position_matrix_collection=(
            'building_block_position_matrices_2'
        ),
    )

    for molecule in itertools.islice(
        molecule_creator.get_molecules(),
        20,
    ):
        constructed_molecule_db_2.put(molecule)


def main() -> None:
    build_database_1()
    build_database_2()


if __name__ == '__main__':
    main()
