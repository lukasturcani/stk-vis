import * as React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import {
    SelectionErrorLabel as SelectionErrorLabelBase,
    BaseProps,
    LabelProps,
} from 'mongo-configurator/components/selection-error-label';


export function SelectionErrorLabel(
    props: BaseProps,
)
{
    return <SelectionErrorLabelBase
        component={ Label  }
        { ...props }
    />;
}


const Label: React.FunctionComponent<LabelProps>
    = (props) => (
        <FormLabel
            { ...props }
        ></FormLabel>
    );
