import * as React from 'react';
import {
    BaseProps as SubmitButtonProps,
} from './submit-button';
import {
    BaseProps as FormProps
} from './form';
import {
    ascending,
} from 'RequestManager.SortType';


export interface BaseProps
{
    open: boolean;
    setOpen: (open: boolean) => void;
    collections: string[];
}


type Empty = Record<string, unknown>;

interface Props extends BaseProps
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


function SortSettings(
    props: Props
)
{
    const [sortType, setSortType] = React.useState(ascending);
    const [collection, setCollection] = React.useState('');
    return (
        <props.dialog
            open={ props.open }
            onClose={ () => props.setOpen(false) }
        >
            <props.container>
                <props.form
                    sortType={sortType}
                    setSortType={setSortType}
                    collection={collection}
                    setCollection={setCollection}
                    collections={props.collections}
                />
                <props.submitButton
                    sortType={sortType}
                    collection={collection}
                    setOpen={props.setOpen}
                />
            </props.container>
        </props.dialog>
    );
}
