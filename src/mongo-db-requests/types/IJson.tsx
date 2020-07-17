export type IJsonPrimitive =
    | undefined
    | string
    | number
    | boolean;


export interface IJson
{
    [prop: string]:
        IJsonPrimitive
        | IJsonPrimitive[]
        | IJson
        | IJson[];
}

export type IJsonValue =
    | IJsonPrimitive | IJsonPrimitive[] | IJson | IJson[];
