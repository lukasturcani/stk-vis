import {
    Action,
    initializeMoleculeBrowser as createAction
} from 'StkVis.Action';
import {
    IMolecule,
} from 'mongo-db-requests/types/IMolecule';
import {
    PageKind,
} from 'mongo-db-requests/types/PageKind';
import {
    SelectingCollection,
    selectingCollection,
} from 'SelectingCollection';
import {
    Molecule,
} from 'Molecules.Molecule';


export const initializeMoleculeBrowser =
    (dispatch: (action: Action) => void) =>
    ( molecules: IMolecule[]
    , pageKind: PageKind
    , valueCollections: string[]
    , moleculeKey: string,
    ): void =>
{
    const requestManager: any
        = {};

    const molecules_: SelectingCollection<Molecule>
        = selectingCollection([])(molecules[0])(molecules.slice(1));

    const columns: string[]
        = valueCollections;

    columns.push(moleculeKey);

    dispatch(
        createAction
        (requestManager)
        (molecules_)
        (columns)
    );
}
