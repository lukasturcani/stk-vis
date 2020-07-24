import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MaterialFormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioBase from '@material-ui/core/Radio';
import SelectBase from '@material-ui/core/Select';
import {
    Form as FormBase,
    BaseProps,
    SelectProps,
    RadioProps,
} from 'request-manager/base/sort-button/form';


export const Form: React.FunctionComponent<BaseProps>
    = (props) => (
        <FormBase
            container={Container}
            formControl={FormControl}
            label={Label}
            select={Select}
            menuItem={MenuItem}
            radio={Radio}
            {...props}
        />
    );


type Empty = Record<string, unknown>;


const Container: React.FunctionComponent<Empty>
    = (props) => (
        <Grid container
            spacing={3}
            alignItems={ 'center' }
            alignContent={ 'center' }
            justify={ 'center' }
        >
            {props.children}
        </Grid>
    );

const Label: React.FunctionComponent<Empty>
    = (props) => (
        <InputLabel
            {...props}
        >
            Collection
        </InputLabel>
    );


const Select: React.FunctionComponent<SelectProps>
    = (props) => (
        <SelectBase
            style={{
                minWidth: 150,
            }}
            value={props.value}
            onChange={
                props.onChange as
                (event: {target: {value: unknown}}) => void
            }
        >
            {props.children}
        </SelectBase>
    );


const FormControl: React.FunctionComponent<Empty>
    = (props) => (
        <Grid item>
            <MaterialFormControl
                {...props}
            >
                {props.children}
            </MaterialFormControl>
        </Grid>
    );


const Radio: React.FunctionComponent<RadioProps>
    = (props) => (
        <Grid item>
            <RadioGroup
                value={props.value}
                onChange={
                    props.onChange as
                    (event: {target: {value: unknown}}) => void
                }
            >
                <FormControlLabel
                    value={'ascending'}
                    control={<RadioBase />}
                    label={'Ascending'}
                />
                <FormControlLabel
                    value={'descending'}
                    control={<RadioBase />}
                    label={'Descending'}
                />
            </RadioGroup>
        </Grid>
    );
