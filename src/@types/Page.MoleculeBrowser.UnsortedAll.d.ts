declare module 'Page.MoleculeBrowser.UnsortedAll'
{
    import { SortType } from 'SortType';
    import { Props } from 'Page.MoleculeBrowser.Props';

    export type Model = Record<string, unknown>;
    export type Action = { type: string; };
    export const reducer: (model: Model) => (action: Action) => Model;
    export const debugInit: Model;

    type UpdateMoleculePage = Record<string, unknown>;

    export const doNothing: Action;
    export const updateMoleculePage:
        (payload: UpdateMoleculePage) => Action;

    export interface ActionCreators<a>
    {
        setSorted: (collection: string) => (sortType: SortType) => a;
        setUnsorted: a;
        updateMoleculePage: (payload: UpdateMoleculePage) => a;
    }

    export const props:
        <a>(actionCreators: ActionCreators<a>) =>
        (model: Model) =>
        Props<a>;
}
