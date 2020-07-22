import * as React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import {
    SelectionErrorLabel as SelectionErrorLabelBase,
    BaseProps,
    ComponentProps,
} from 'mongo-configurator/base/selection-error-label';


export function SelectionErrorLabel(
    props: BaseProps,
)
{
    return <SelectionErrorLabelBase
        component={ Label  }
        { ...props }
    />;
}


const Label: React.FunctionComponent<ComponentProps>
    = (props) => (
        <FormLabel
            { ...props }
        ></FormLabel>
    );
