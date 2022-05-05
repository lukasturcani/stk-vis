import * as React from 'react';
import {
    CoreProps as SubmitButtonProps,
} from './submit-button';
import {
    BaseProps as FormProps
} from './form';
import {
    SortType
} from 'SortType';
import { Snackbar } from 'Snackbar';


export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export interface BaseProps<a>
{
    snackbar: Snackbar;
    open: boolean;
    setOpen: (open: boolean) => void;
    collections: string[];

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

type Empty = Record<string, unknown>;

interface Props<a> extends BaseProps<a>, DispatchProps<a>
{
    dialog: React.FunctionComponent<DialogProps>;
    container: React.FunctionComponent<Empty>;
    form: React.FunctionComponent<FormProps>;
    submitButton: React.FunctionComponent<SubmitButtonProps<a>>;
}

export interface DialogProps
{
    open: boolean;
    onClose: () => void;
}

export function SortSettings<a>(
    props: Props<a>,
)
{

    // sortType requires a type-assertion when passed to props.form
    // props.submitButton from string to 'ascending' | 'descending'.
    const [sortType, setSortType] = React.useState('ascending');
    const [collection, setCollection] = React.useState('');
    return (
        <props.dialog
            open={ props.open }
            onClose={ () => props.setOpen(false) }
        >
            <props.container>
                <props.form
                    sortType={sortType as 'ascending' | 'descending'}
                    setSortType={setSortType}
                    collection={collection}
                    setCollection={setCollection}
                    collections={props.collections}
                />
                <props.submitButton
                    snackbar={props.snackbar}
                    dispatch={props.dispatch}
                    setSorted={props.setSorted}
                    setUnsorted={props.setUnsorted}
                    sortType={sortType as 'ascending' | 'descending'}
                    collection={collection}
                    setOpen={props.setOpen}
                />
            </props.container>
        </props.dialog>
    );
}
