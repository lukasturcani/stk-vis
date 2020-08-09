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
    import {
        InitializeUnsortedAll
    } from 'MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll'
    import {
        InitializeUnsortedBuildingBlocks
    } from 'MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks'
    import {
        InitializeUnsortedConstructedMolecules
    } from 'MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules'
    import {
        SetSorted,
    } from  'RequestManager.SetSorted';
    import {
        SetUnsorted,
    } from 'RequestManager.SetUnsorted';
    import {
        SelectMolecule
    } from 'Molecules.SelectMolecule';

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
        setSorted: (payload: SetSorted) => a;
        setUnsorted: (payload: SetUnsorted) => a;
        selectMolecule: (payload: SelectMolecule) => a;
        initializeUnsortedAll: (payload: InitializeUnsortedAll) => a;

        initializeUnsortedBuildingBlocks:
            (payload: InitializeUnsortedBuildingBlocks) => a;

        initializeUnsortedConstructedMolecules:
            (payload: InitializeUnsortedConstructedMolecules) => a;
    }

    export const props:
        <a>(actionCreators: ActionCreators<a>) =>
        (state: StkVis) =>
        Props<a>;
}
