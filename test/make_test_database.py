import stk
import pymongo


def main() -> None:
    constructed_molecule_jsonizer = stk.ConstructedMoleculeJsonizer(
        key_makers=(
            stk.Smiles(),
        ),
    ),
    constructed_molecule_db = stk.ConstructedMoleculeMongoDb(
        mongo_client=pymongo.MongoClient(),
        database='_stk-vis-test',
        position_matrix_collection='position-matrices-1',
        building_block_position_matrix_collection=(
            'position-matrices-2'
        ),
    )




if __name__ == '__main__':
    main()
