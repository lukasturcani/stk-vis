import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


interface IMoleculeTypeSelectorProps
{
    setError: (error: boolean) => void;
    buildingBlocks: boolean;
    setBuildingBlocks: (buildingBlocks: boolean) => void;
    constructedMolecules: boolean;
    setConstructedMolecules: (constructedMolecules: boolean) => void;
}


function handleChange(
    states: boolean[],
    state: boolean,
    setState: (newState: boolean) => void,
    setError: (error: boolean) => void,
)
    : (e: any) => void
{
    return (e: any) => {
        setState(e.target.checked);

        const numActive: number
            = states.filter(state => state).length
            + ((e.target.checked)? 1 : -1);

        setError(numActive <= 0);

    };
}


export function MoleculeTypeSelectorComponent(
    props: IMoleculeTypeSelectorProps,
)
{
    const states = [props.buildingBlocks, props.constructedMolecules];
    const error: boolean = states.filter(state => state).length == 0;

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
                                handleChange(
                                    [
                                        props.buildingBlocks,
                                        props.constructedMolecules,
                                    ],
                                    props.buildingBlocks,
                                    props.setBuildingBlocks,
                                    props.setError,
                                )
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
                                    [
                                        props.buildingBlocks,
                                        props.constructedMolecules,
                                    ],
                                    props.constructedMolecules,
                                    props.setConstructedMolecules,
                                    props.setError,
                                )
                            }
                        />
                    }
                    label="Constructed Molecules"
                  />
                  <FormLabel
                      error={ error }
                  >
                      * Pick at least one.
                  </FormLabel>
            </FormControl>
        </div>
    );
}
