import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MaterialFormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import MenuItemBase from '@material-ui/core/MenuItem';
import SelectBase from '@material-ui/core/Select';
import {
    Form as FormBase,
    BaseProps,
    SelectProps,
    MenuItemProps,
} from 'request-manager/base/sort-button/form';


export const Form: React.FunctionComponent<BaseProps>
    = (props) => (
        <Grid item>
            <FormBase
                formControl={FormControl}
                label={Label}
                select={Select}
                menuItem={MenuItem}
                {...props}
            />
        </Grid>
    );


type Empty = Record<string, unknown>;
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
        />
    );


const MenuItem: React.FunctionComponent<MenuItemProps>
    = (props) => (
        <MenuItemBase
            {...props}
        >
            {props.children}
        </MenuItemBase>
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
