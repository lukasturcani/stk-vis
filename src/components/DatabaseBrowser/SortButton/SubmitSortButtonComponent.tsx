import * as React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';


interface SubmitSortButtonProps
{
    setOpen: (open: boolean) => void;
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
        return;
    };
}


export function SubmitSortButtonComponent(
    props: SubmitSortButtonProps,
)
{
    return (
        <Button
            onClick={
                submitSort({
                    setOpen: props.setOpen,
                })
            }
        >
            <DoneIcon />
        </Button>
    );
}
