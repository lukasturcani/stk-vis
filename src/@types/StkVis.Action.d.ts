declare module 'StkVis.Action'
{
    import {
        MongoData
    } from 'MongoConfigurator.UpdateFields.MongoData';
    import {
        PageData
    } from 'MoleculeBrowser.UpdateMoleculePage.PageData';

    export interface Action
    {
        type: string;
    }

    export const updateFields:
        (mongoData: MongoData) => Action;

    export const updateMoleculePage:
        (pageData: PageData) => Action;

    export const initializeMoleculeBrowser:
        (requestManager: any) =>
        (molecules: SelectingCollection<Molecule>) =>
        (columns: string[]) =>
        Action
}
