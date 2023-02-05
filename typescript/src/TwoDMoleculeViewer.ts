import * as SmilesDrawer from 'smiles-drawer';

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

export class TwoDMoleculeViewer extends HTMLElement {
  _smiles?: string;
  _smilesDrawer?: SmilesDrawer.Drawer

  constructor() {
    super();
    this._smilesDrawer = new SmilesDrawer.Drawer({});
  }

  set molecule(item: Molecule) {

  }

  connectedCallback() {
  }
}
