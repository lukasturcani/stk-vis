import * as React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
    BaseProps as LabelProps,
} from './selection-error-label';


export interface BaseProps
{
    buildingBlocks: boolean;
    setBuildingBlocks: (buildingBlocks: boolean) => void;
    constructedMolecules: boolean;
    setConstructedMolecules: (constructedMolecules: boolean) => void;
}


interface Props extends BaseProps
{
    formControl: React.FunctionComponent<Record<string, unknown>>
    errorLabel: React.FunctionComponent<LabelProps>
}


function handleChange(
    setState: (newState: boolean) => void,
)
    : (e: { target: { checked: boolean } }) => void
{
    return (e: { target: { checked: boolean } }) =>
        setState(e.target.checked);
}


export function SearchKindSelector(
    props: Props,
)
{
    return (
        <div>
            <props.formControl>
                <FormLabel>
                    Show Me:
                </FormLabel>
                  <FormControlLabel
                    control={
                        <Checkbox
                            name="buildingBlocks"
                            checked={ props.buildingBlocks }
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
                  <props.errorLabel
                    buildingBlocks={ props.buildingBlocks }
                    constructedMolecules={ props.constructedMolecules }
                  />
            </props.formControl>
        </div>
    );
}
