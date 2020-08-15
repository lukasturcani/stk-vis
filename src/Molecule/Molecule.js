const chemlib = require('openchemlib/minimal');

exports.meshOptions = {};
exports._smilesImpl = helpers => molecule =>
{
    const atoms = helpers.atoms(molecule);
    const bonds = helpers.bonds(molecule);

    const chemlibMolecule = new chemlib.Molecule(
        atoms.length,
        bonds.length
    );

    const moleculeAtoms = [];

    for (const atom of atoms)
    {
        moleculeAtoms.push(
         chemlibMolecule.addAtom(
                helpers.atomicNumber(helpers.chemicalSymbol(atom))
            )
        );
    }

    for (const bond of bonds)
    {
         chemlibMolecule.addOrChangeBond(
            helpers.id(helpers.atom1(bond)),
            helpers.id(helpers.atom2(bond)),
            helpers.order(bond)
        );
    }

    return chemlibMolecule.toSmiles();
};
