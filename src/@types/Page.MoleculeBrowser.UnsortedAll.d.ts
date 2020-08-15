declare module 'Page.MoleculeBrowser.UnsortedAll'
{
    export type Model = Record<string, unknown>;
    export type Action = Record<string, unknown>;
    export const reducer: (model: Model) => (action: Action) => Model;
    export const debugInit: Model;
}
