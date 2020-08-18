declare module 'Page.StkVis'
{
    import {
        Props as ConfiguratorProps,
    } from 'Page.MongoConfigurator';
    import {
        Props as BrowserProps,
    } from 'Page.MoleculeBrowser.Props';


    export type Action = { type: string };
    export type Model = unknown;

    export interface Props
    {
        value0: ConfiguratorProps<Action> | BrowserProps<Action>;
    }

    export const props: (model: Model) => Props;
    export const reducer: (model: Model) => (action: Action) => Model;
    export const init: Model;
}
