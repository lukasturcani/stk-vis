import * as React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {
    SwitchProps,
    CoreProps,
    ViewerSwitch as ViewerSwitchBase
} from './base';



export function ViewSwitcher<a>(
    props: CoreProps<a>,
)
{
    return <ViewerSwitchBase
        switchComponent={SwitchComponent}
        {...props}
    />;
}



const SwitchComponent: React.FunctionComponent<SwitchProps>
    = (props) => (
        <FormControlLabel
            control={
                <Switch
                    checked={props.checked}
                    onChange={props.onChange}
                    name={props.label}
                />
            }
            label={props.label}
        />
    );
