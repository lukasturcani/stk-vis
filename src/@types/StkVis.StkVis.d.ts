declare module 'StkVis.StkVis'
{
    import {
        Props as ConfiguratorProps,
    } from 'MongoConfigurator.MongoConfigurator';

    import {
        Props as MoleculeBrowserProps
    } from 'MoleculeBrowser.MoleculeBrowser';
    import {
        RequestResult,
    } from 'RequestManager.RequestResult';

    import { Action } from 'StkVis.Action';

    export type StkVis = Record<string, unknown>;

    export interface Props<a>
    {
        value0?: ConfiguratorProps;
        value1?: MoleculeBrowserProps<a>;
    }

    export const initialState: StkVis;

    export const reducer:
        (state: StkVis) => (action: Action) => StkVis;

    export interface Helpers<a>
    {
        pageRequestResultToAction: <a>(result: RequestResult) => a;
    }

    export const props:
        <a>(helpers: Helpers<a>) =>
        (state: StkVis) =>
        Props<a>;
}
