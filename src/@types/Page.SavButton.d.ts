declare module 'Page.SaveButton'
{
    export interface Writer
    {
        name: string;
    }

    export interface Props
    {
        writers: Writer[];
    }
}
