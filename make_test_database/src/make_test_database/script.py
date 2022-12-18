import pymongo
import stk


def main() -> None:
    client = pymongo.MongoClient()
    molecules = stk.MoleculeMongoDb(
        mongo_client=client,
        database="stk-vis-dev",
        jsonizer=stk.MoleculeJsonizer(
            key_makers=(
                stk.InchiKey(),
                stk.Smiles(),
            ),
        ),
        indices=(
            stk.InchiKey().get_key_name(),
            stk.Smiles().get_key_name(),
        ),
    )
    num_atoms = stk.ValueMongoDb(
        mongo_client=client,
        collection="Num Atoms",
        database="stk-vis-dev",
        key_makers=(
            stk.InchiKey(),
            stk.Smiles(),
        ),
        indices=(
            stk.InchiKey().get_key_name(),
            stk.Smiles().get_key_name(),
        ),
    )
    num_bonds = stk.ValueMongoDb(
        mongo_client=client,
        collection="Num Bonds",
        database="stk-vis-dev",
        key_makers=(
            stk.InchiKey(),
            stk.Smiles(),
        ),
        indices=(
            stk.InchiKey().get_key_name(),
            stk.Smiles().get_key_name(),
        ),
    )
    building_blocks = (
        stk.BuildingBlock("CBr"),
        stk.BuildingBlock("NCBr"),
        stk.BuildingBlock("c1ccccc1"),
        stk.BuildingBlock("BrCCBr"),
    )

    for building_block in building_blocks:
        molecules.put(building_block)
        num_atoms.put(building_block, building_block.get_num_atoms())

    for building_block in building_blocks[::2]:
        num_bonds.put(building_block, building_block.get_num_bonds())


if __name__ == "__main__":
    main()
