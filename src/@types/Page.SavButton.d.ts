declare module 'Page.SaveButton'
{
    export interface Writer
    {
        name: string;
        write: () => string;
    }

    export interface Props
    {
        writers: Writer[];
        defaultFilename: string;
    }
}
