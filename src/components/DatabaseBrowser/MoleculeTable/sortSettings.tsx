import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';



export interface SortSettings
{
    setOpen: (open: boolean) => void;
    open: boolean;
}



export function getSortSettings()
    : SortSettings
{
    const [open, setOpen] = React.useState(false);
    return {
        open,
        setOpen,
    }
}



interface SortSettingsProps
{
    open: boolean;
    onClose: () => void;
    columnNames: string[];
}


export function SortSettingsComponent(
    props: SortSettingsProps
)
{
    const [radioValue, setRadioValue] = React.useState('Ascending');
    const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue((event.target as HTMLInputElement).value);
    };

    const [collection, setCollection] = React.useState('numAtoms');
    const collectionChange = (e: any) => {
        setCollection(e.target.value);
    };

    return (
        <Dialog
            onClose={ props.onClose }
            open={ props.open }
        >
            <Paper
                style={
                    { padding: '30px' }
                }
            ><Grid container
                spacing={3}
                alignItems={ 'center' }
                alignContent={ 'center' }
                justify={ 'center' }
            >
                <Grid container
                    spacing={3}
                    alignItems={ 'center' }
                    alignContent={ 'center' }
                    justify={ 'center' }
                >
                    <Grid item>
                        <FormControl>
                            <InputLabel>Collection</InputLabel>
                            <Select
                                value={ collection }
                                onChange={ collectionChange }
                            >
                                <MenuItem value='numAtoms'>
                                    numAtoms
                                </MenuItem>
                                <MenuItem value='numBonds'>
                                    numBonds
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <RadioGroup
                            value={ radioValue }
                            onChange={ radioChange }
                        >
                            <FormControlLabel
                                value='Ascending'
                                control={ <Radio /> }
                                label='Ascending'
                            />
                            <FormControlLabel
                                value='Descending'
                                control={ <Radio /> }
                                label='Descending'
                            />
                        </RadioGroup>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button>
                        <DoneIcon />
                    </Button>
                </Grid>
            </Grid></Paper>
        </Dialog>
    );
}
