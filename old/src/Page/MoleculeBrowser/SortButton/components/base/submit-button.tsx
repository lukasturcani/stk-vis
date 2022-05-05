import * as React from 'react';
import {
    SortType,
    ascending,
    descending,
} from 'SortType';
import { Snackbar } from 'Snackbar';

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}


export interface BaseProps<a>
{
    snackbar: Snackbar;
    sortType: 'ascending' | 'descending';
    setOpen: (open: boolean) => void;
    collection: string;

    setSorted:
        () =>
        (dispatch: (action: a) => void) =>
        (snackbar: Snackbar) =>
        (collection: string) =>
        (sortType: SortType) =>
        Promise<void>;

    setUnsorted:
        () =>
        (dispatch: (action: a) => void) =>
        (snackbar: Snackbar) =>
        Promise<void>;

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
                        props.setUnsorted
                            ()
                            (props.dispatch)
                            (props.snackbar);
                    }
                    else
                    {
                        props.setSorted
                            ()
                            (props.dispatch)
                            (props.snackbar)
                            (props.collection)
                            (
                                props.sortType === 'ascending'?
                                ascending : descending
                            );
                    }
                }
            }
        />
    );
}
