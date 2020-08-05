import * as React from 'react';

export interface DispatchProps
{
    setSortedCollection:
        (
            sortType: 'ascending' | 'descending',
            collection: string,
        ) => void
}


export interface BaseProps
{
    sortType: 'ascending' | 'descending';
    setOpen: (open: boolean) => void;
    collection: string;
}


export type CoreProps = BaseProps & DispatchProps;


interface Props extends BaseProps, DispatchProps
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
                () => {
                    props.setOpen(false);
                    props.setSortedCollection(
                        props.sortType,
                        props.collection,
                    );
                }
            }
        />
    );
}
