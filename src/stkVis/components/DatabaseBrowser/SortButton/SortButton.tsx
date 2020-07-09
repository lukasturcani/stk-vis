import * as React from 'react';
import {
    getSortSettings,
    SortSettingsComponent,
    SortSettings,
} from './sortSettings';
import Sort from '@material-ui/icons/Sort';
import Button from '@material-ui/core/Button';


export function SortButtonComponent()
{
    const sortSettings: SortSettings
        = getSortSettings();

    return (
        <div>
            <Button
                color='secondary'
                onClick={ () => sortSettings.setOpen(true) }
            >
                <Sort />
            </Button>
            <SortSettingsComponent
                open={ sortSettings.open }
                onClose={ () => { sortSettings.setOpen(false); } }
                setOpen={ sortSettings.setOpen }
            />
        </div>
        );
}
