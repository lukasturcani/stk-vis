declare module 'MoleculeBrowser.MoleculeBrowser'
{
    import {
        IAction,
    } from 'MoleculeBrowser.Action';

    export type IMoleculeBrowser = Record<string, unknown>;

    export interface IProps
    {
        value0: {
            kind: 'Molecule Browser';
        };
    }

    export const initialState: IMoleculeBrowser;

    export const reducer:
        (state: IMoleculeBrowser) =>
        (action: IAction) =>
        IMoleculeBrowser;

    export const props: (state: IMoleculeBrowser) => IProps;
}
