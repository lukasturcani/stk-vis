declare module 'Page.MoleculeBrowser.UnsortedAll'
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

    export const doNothing: Action;
    export const updateMoleculePage:
        (payload: UpdateMoleculePage) => Action;
    export const selectMolecule:
        (rowIndex: number) => (molecule: Molecule) => Action;

    export interface ActionCreators<a>
    {
        setSorted: (collection: string) => (sortType: SortType) => a;
        setUnsorted: a;
        updateMoleculePage: (payload: UpdateMoleculePage) => a;

        selectMolecule:
            (rowIndex: number) =>
            (molecule: Molecule) =>
            a

        initMongoConfigurator:
            (payload: Config.MongoConfigurator) => a;
    }

    export const props:
        <a>(actionCreators: ActionCreators<a>) =>
        (model: Model) =>
        Props<a>;
}
