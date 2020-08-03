declare module 'Molecules.Utils.UnsortedAll'
{
    import { Action } from 'Molecules.Action';
    import { Result } from 'Requests.UnsortedAll';

    const initializeMolecules:
        (dispatch: (action: Action) => void) =>
        (moleculeKey: string) =>
        (result: Result) => void;
}
