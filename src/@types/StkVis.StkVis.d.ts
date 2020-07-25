declare module 'StkVis.StkVis'
{
    import {
        Props as ConfiguratorProps,
    } from 'MongoConfigurator.MongoConfigurator';

    import {
        Props as MoleculeBrowserProps
    } from 'MoleculeBrowser.MoleculeBrowser';

    import { IAction } from 'StkVis.Action';

    export type IStkVis = Record<string, unknown>;

    export interface Props
    {
        value0: ConfiguratorProps;
        value1: MoleculeBrowserProps;
    }

    export const initialState: IStkVis;

    export const reducer:
        (state: IStkVis) => (action: IAction) => IStkVis;

    export const props: (state: IStkVis) => Props;
}
