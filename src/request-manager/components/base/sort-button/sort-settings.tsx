import * as React from 'react';
import {
    CoreProps as SubmitButtonProps,
} from './submit-button';
import {
    BaseProps as FormProps
} from './form';


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
    open: boolean;
    setOpen: (open: boolean) => void;
    collections: string[];
}

export type CoreProps = BaseProps & DispatchProps;

type Empty = Record<string, unknown>;

interface Props extends BaseProps, DispatchProps
{
    dialog: React.FunctionComponent<DialogProps>;
    container: React.FunctionComponent<Empty>;
    form: React.FunctionComponent<FormProps>;
    submitButton: React.FunctionComponent<SubmitButtonProps>;
}

export interface DialogProps
{
    open: boolean;
    onClose: () => void;
}

export function SortSettings(
    props: Props
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
                    setSortedCollection={props.setSortedCollection}
                    sortType={sortType as 'ascending' | 'descending'}
                    collection={collection}
                    setOpen={props.setOpen}
                />
            </props.container>
        </props.dialog>
    );
}
