import * as React from 'react';
import {
    ISortType,
} from 'RequestManager.SortType';


export interface BaseProps
{
    sortType: ISortType;
    setOpen: (open: boolean) => void;
    collection: string;
}


interface Props extends BaseProps
{
    button: React.FunctionComponent<ButtonProps>;
}


export interface ButtonProps
{
    onClick: () => void;
}


export function SubmitButton(
    props: Props,
)
{
    return (
        <props.button
            onClick={
                submit({
                    sortType: props.sortType,
                    collection: props.collection,
                    setOpen: props.setOpen,
                })
            }
        />
    );
}


interface SubmitOptions
{
    collection: string;
    setOpen: (open: boolean) => void;
    sortType: ISortType;
}


function submit(
    options: SubmitOptions,
)
{
    return () => {
        options.setOpen(false);
        console.log(options.collection);
        console.log(options.sortType);
    };
}
