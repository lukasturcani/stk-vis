import { AnyAction } from '@reduxjs/toolkit';
import * as React from 'react';
import { connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import {
    SortedType,
    SortSettingsKind,
} from '../../../models';
import {
    setSortSettings,
} from  '../../../actions';


interface SubmitSortButtonProps
{
    setOpen: (open: boolean) => void;
    dispatchSetSortSettings:
        (sortedCollection: string, sortedType: SortedType) => void;
    sortedCollection: string;
    sortedType: SortedType;
}


interface SubmitSortOptions
{
    setOpen: (open: boolean) => void;
    dispatchSetSortSettings:
        (sortedCollection: string, sortedType: SortedType) => void;
    sortedCollection: string;
    sortedType: SortedType;
}


function submitSort(
    options: SubmitSortOptions,
)
{
    return () => {
        options.dispatchSetSortSettings(
            options.sortedCollection,
            options.sortedType,
        );
        options.setOpen(false);
    };
}


function SubmitSortButton(
    props: SubmitSortButtonProps,
)
{
    return (
        <Button
            onClick={
                submitSort({
                    setOpen: props.setOpen,
                    sortedCollection: props.sortedCollection,
                    sortedType: props.sortedType,
                    dispatchSetSortSettings:
                        props.dispatchSetSortSettings,
                })
            }
        >
            <DoneIcon />
        </Button>
    );
}


function mapDispatchToProps(
    dispatch: (action: AnyAction) => void,
)
{
    return {
        dispatchSetSortSettings:
            (sortedCollection: string, sortedType: SortedType) => {
                if ( sortedCollection === '')
                {
                    dispatch(setSortSettings({
                        kind: SortSettingsKind.Unsorted,
                    }));
                }
                else
                {
                    dispatch(setSortSettings({
                        kind: SortSettingsKind.Sorted,
                        collection: sortedCollection,
                        sortedType,
                    }))
                }
            },
    };
}



export const SubmitSortButtonComponent
    = connect(undefined, mapDispatchToProps)(SubmitSortButton);
