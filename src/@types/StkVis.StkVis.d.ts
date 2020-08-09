declare module 'StkVis.StkVis'
{
    import {
        Props as ConfiguratorProps,
    } from 'MongoConfigurator.MongoConfigurator';

    import {
        Props as MoleculeBrowserProps
    } from 'MoleculeBrowser.MoleculeBrowser';
    import {
        UpdateMoleculePage
    } from 'RequestManager.UpdateMoleculePage';

    import { Action } from 'StkVis.Action';

    export type StkVis = Record<string, unknown>;

    export interface Props<a>
    {
        value0?: ConfiguratorProps<a>;
        value1?: MoleculeBrowserProps<a>;
    }

    export const initialState: StkVis;

    export const reducer:
        (state: StkVis) => (action: Action) => StkVis;

    export interface ActionCreators<a>
    {
        updateMoleculePage: (payload: UpdateMoleculePage) => a;
    }

    export const props:
        <a>(actionCreators: ActionCreators<a>) =>
        (state: StkVis) =>
        Props<a>;
}
