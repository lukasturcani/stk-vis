import {
    Action,
    initializeMoleculeBrowser,
} from 'StkVis.Action';
import {
    IMolecule,
} from 'mongo-db-requests/types/IMolecule';
import {
    PageKind,
} from 'mongo-db-requests/types/PageKind';


export const initializeMoleculeBrowser =
    (dispatch: (action: Action) => void) =>
    ( molecules: IMolecule[]
    , pageKind: PageKind
    , valueCollections: string[]
    ) =>
{
    return
}
