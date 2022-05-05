declare module 'Page.MoleculeBrowser.SortedAll'
{
    import { SortType } from 'SortType';
    import { Props } from 'Page.MoleculeBrowser.Props';
    import { Molecule } from 'Molecule';
    import * as Config from 'Config';

    export type Model = Record<string, unknown>;
    export type Action = { type: string; };
    export const reducer: (model: Model) => (action: Action) => Model;
    export const debugInit: Model;

    type UpdateMoleculePage = Record<string, unknown>;
    type ChangeSortedCollection = unknown;

    export const doNothing: Action;
    export const updateMoleculePage:
        (payload: UpdateMoleculePage) => Action;
    export const selectMolecule:
        (rowIndex: number) => (molecule: Molecule) => Action;
    export const changeSortedCollection:
        (payload: ChangeSortedCollection) => Action;

    export interface ActionCreators<a>
    {
        updateMoleculePage: (payload: UpdateMoleculePage) => a;

        changeSortedCollection:
            (payload: ChangeSortedCollection) => a;

        selectMolecule:
            (rowIndex: number) =>
            (molecule: Molecule) =>
            a

        initMongoConfigurator:
            (payload: Config.MongoConfigurator) => a;

        initUnsortedAll:
            (payload: Config.UnsortedAll) => a;
    }

    export const props:
        <a>(actionCreators: ActionCreators<a>) =>
        (model: Model) =>
        Props<a>;
}
