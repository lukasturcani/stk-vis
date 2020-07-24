import * as React from 'react';


export interface BaseProps
{
    setOpen: (open: boolean) => void;
}


interface Props extends BaseProps
{
    button: React.FunctionComponent<ButtonProps>;
}


export interface ButtonProps
{
    onClick: () => void;
}


export function SubmitSortButton(
    props: Props,
)
{
    return (
        <props.button
            onClick={
                submitSort({
                    setOpen: props.setOpen,
                })
            }
        />
    );
}


interface SubmitSortOptions
{
    setOpen: (open: boolean) => void;
}


function submitSort(
    options: SubmitSortOptions,
)
{
    return () => {
        options.setOpen(false);
    };
}
