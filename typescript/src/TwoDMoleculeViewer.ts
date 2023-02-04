// import * as SmilesDrawer from 'smiles-drawer';

interface Atom {
  atomicNumber: number;
}

interface Bond {
  order: number;
  atom1: number;
  atom2: number;
}

interface Molecule {
  atoms: Atom[];
  bonds: Bond[];
}

class TwoDMoleculeViewer extends HTMLElement {
  _smiles?: string;

  constructor() {
    super();

  }

  set molecule(item: Molecule) {

  }

  connectedCallback() {
  }
}
