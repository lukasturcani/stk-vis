import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { SelectionErrorLabel } from './selection-error-label';
import {
    SearchKindSelector as SearchKindSelectorBase,
    BaseProps,
} from 'mongo-configurator/base/search-kind-selector';


export function SearchKindSelector(
    props: BaseProps,
)
{
    return <SearchKindSelectorBase
        formControl={ StyledFormControl }
        errorLabel={ SelectionErrorLabel }
        { ...props }
    />;
}


type Empty = Record<string, unknown>;
const StyledFormControl: React.FunctionComponent<Empty>
    = (props) => (
        <FormControl
            focused={ false }
            { ...props }
        >
            { props.children }
        </FormControl>
    );
