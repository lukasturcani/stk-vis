import * as React from 'react';
import {
    CollectionCheckboxProps as CollectionCheckboxProps
} from 'Page.ColumnButton';


export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export interface BaseProps<a>
{
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

export interface CheckboxProps
{
    checked: boolean;
    label: string;
    onChange: (event: {target: {checked: boolean}}) => void;
}


interface Props<a> extends BaseProps<a>, DispatchProps<a>
{
    container: React.FunctionComponent<Empty>;
    formControl: React.FunctionComponent<Empty>;
    formGroup: React.FunctionComponent<Empty>;
    checkbox: React.FunctionComponent<CheckboxProps>
}

export function Form<a>(
    props: Props<a>,
)
{
    return (
        <props.container>
            <props.formControl>
                <props.formGroup>
                    {props.collections.map(collection => {
                        return <props.checkbox
                            key={collection.label}
                            checked={collection.isChecked}
                            label={collection.label}
                            onChange={e => {
                                if (e.target.checked)
                                {
                                    props.showCollection
                                        (props.dispatch)
                                        (collection.label);
                                }
                                else
                                {
                                    props.hideCollection
                                        (props.dispatch)
                                        (collection.label);
                                }
                            }}
                        />;
                    })}
                </props.formGroup>
            </props.formControl>
        </props.container>
    );
}
