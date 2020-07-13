import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { SelectionErrorLabel } from './SelectionErrorLabel';


interface IMoleculeTypeSelectorProps
{
    buildingBlocks: boolean;
    setBuildingBlocks: (buildingBlocks: boolean) => void;
    constructedMolecules: boolean;
    setConstructedMolecules: (constructedMolecules: boolean) => void;
}


function handleChange(
    setState: (newState: boolean) => void,
)
    : (e: any) => void
{
    return (e: any) => {
        setState(e.target.checked);

    };
}


export function MoleculeTypeSelectorComponent(
    props: IMoleculeTypeSelectorProps,
)
{
    return (
        <div>
            <FormControl
                focused={false}
            >
                <FormLabel>
                    Show Me:
                </FormLabel>
                  <FormControlLabel
                    control={
                        <Checkbox
                            color='secondary'
                            name="buildingBlocks"
                            checked={ props.buildingBlocks}
                            onChange={
                                handleChange(props.setBuildingBlocks)
                            }
                        />
                    }
                    label="Building Blocks"
                  />
                  <FormControlLabel
                    control={
                        <Checkbox
                            color='secondary'
                            name="constructedMolecules"
                            checked={ props.constructedMolecules }
                            onChange={
                                handleChange(
                                    props.setConstructedMolecules,
                                )
                            }
                        />
                    }
                    label="Constructed Molecules"
                  />
                  <SelectionErrorLabel
                    buildingBlocks={ props.buildingBlocks }
                    constructedMolecules={ props.constructedMolecules }
                  />
            </FormControl>
        </div>
    );
}
