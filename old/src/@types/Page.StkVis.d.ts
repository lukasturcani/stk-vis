declare module 'Page.StkVis'
{
    import {
        Props as ConfiguratorProps,
    } from 'Page.MongoConfigurator';
    import {
        Props as MoleculeBrowserProps,
    } from 'Page.MoleculeBrowser.Props';
    import {
        Props as BuildingBlockBrowserProps,
    } from 'Page.BuildingBlockBrowser';


    export type Action = { type: string };
    export type Model = unknown;

    export interface Props
    {
        value0:
            ConfiguratorProps<Action>
            | MoleculeBrowserProps<Action>
            | BuildingBlockBrowserProps<Action>;
    }

    export const props: (model: Model) => Props;
    export const reducer: (model: Model) => (action: Action) => Model;
    export const init: Model;
}
