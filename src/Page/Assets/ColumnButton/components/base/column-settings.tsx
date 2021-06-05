import * as React from 'react';
import {
    CoreProps as FormProps
} from './form';
import {
    CollectionCheckboxProps as CollectionCheckboxProps
} from 'Page.ColumnButton';


export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export interface BaseProps<a>
{
    open: boolean;
    setOpen: (open: boolean) => void;
    collections: CollectionCheckboxProps[];

    hideCollection:
        (dispatch: (action: a) => void) =>
        (collection: string) =>
        void;

    showCollection:
        (dispatch: (action: a) => void) =>
        (collection: string) =>
        void;
}

export type CoreProps<a> = BaseProps<a> & DispatchProps<a>;

type Empty = Record<string, unknown>;

interface Props<a> extends BaseProps<a>, DispatchProps<a>
{
    dialog: React.FunctionComponent<DialogProps>;
    container: React.FunctionComponent<Empty>;
    form: React.FunctionComponent<FormProps<a>>;
}

export interface DialogProps
{
    open: boolean;
    onClose: () => void;
}

export function ColumnSettings<a>(
    props: Props<a>,
)
{
    return (
        <props.dialog
            open={ props.open }
            onClose={ () => props.setOpen(false) }
        >
            <props.container>
                <props.form
                    dispatch={props.dispatch}
                    collections={props.collections}
                    hideCollection={props.hideCollection}
                    showCollection={props.showCollection}
                />
            </props.container>
        </props.dialog>
    );
}
