import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MaterialFormControl from '@material-ui/core/FormControl';
import FormGroupBase from '@material-ui/core/FormGroup';
import CheckboxBase from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import SelectBase from '@material-ui/core/Select';
import {
    Form as FormBase,
    CoreProps,
    CheckboxProps,
} from '../base/form';


export function Form<a>(
    props: CoreProps<a>,
)
{
    return <FormBase
        container={Container}
        formControl={FormControl}
        formGroup={FormGroup}
        checkbox={Checkbox}
        {...props}
    />;
}


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

const FormGroup: React.FunctionComponent<Empty>
    = (props) => (
        <FormGroupBase
            {...props}
        >
            {props.children}
        </FormGroupBase>
    );

const Checkbox: React.FunctionComponent<CheckboxProps>
    = (props) => (
        <FormControlLabel
            control={
                <CheckboxBase
                    checked={props.checked}
                    onChange={props.onChange}
                />
            }
            label={props.label}
        />
    );
