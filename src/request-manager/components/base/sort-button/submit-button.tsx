import * as React from 'react';
import {
    SortType
} from 'RequestManager.SortType';
import {
    ascending,
    descending,
} from 'RequestManager.SortType';

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}


export interface BaseProps<a>
{
    sortType: 'ascending' | 'descending';
    setOpen: (open: boolean) => void;
    collection: string;

    setSorted:
        () =>
        (dispatch: (action: a) => void) =>
        (collection: string) =>
        (sortType: SortType) =>
        void;

    setUnsorted: () => (dispatch: (action: a) => void) => void;

}


export type CoreProps<a> = BaseProps<a> & DispatchProps<a>;


interface Props<a> extends BaseProps<a>, DispatchProps<a>
{
    button: React.FunctionComponent<ButtonProps>;
}


export interface ButtonProps
{
    onClick: () => void;
}


export function SubmitButton<a>(
    props: Props<a>,
)
{
    return (
        <props.button
            onClick={
                () => {
                    props.setOpen(false);
                    if (props.collection === '')
                    {
                        props.setUnsorted()(props.dispatch);
                    }
                    else
                    {
                        props.setSorted
                            ()
                            (props.dispatch)
                            (props.collection)
                            (
                                props.sortType === 'ascending'?
                                ascending : descending
                            )
                    }
                }
            }
        />
    );
}
