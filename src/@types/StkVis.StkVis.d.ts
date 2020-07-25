declare module 'StkVis.StkVis'
{
    import {
        Props as ConfiguratorProps,
    } from 'MongoConfigurator.MongoConfigurator';

    import {
        Props as MoleculeBrowserProps
    } from 'MoleculeBrowser.MoleculeBrowser';

    import { Action } from 'StkVis.Action';

    export type StkVis = Record<string, unknown>;

    export interface Props
    {
        value0?: ConfiguratorProps;
        value1?: MoleculeBrowserProps;
    }

    export const initialState: StkVis;

    export const reducer:
        (state: StkVis) => (action: Action) => StkVis;

    export const props: (state: StkVis) => Props;
}
