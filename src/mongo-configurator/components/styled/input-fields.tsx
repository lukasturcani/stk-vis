import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {
    InputFields as InputFieldsBase,
    BaseProps,
} from 'mongo-configurator/base/input-fields';
import { SearchKindSelector } from './search-kind-selector';


export function InputFields(
    props: BaseProps,
)
{
    return (
        <InputFieldsBase { ...props }
            component={ Container }
            searchKindSelector={ SearchKindSelector }
        />
    );
}


const Container: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <Grid container
            alignItems={ 'center' }
            alignContent={ 'center' }
            justify={ 'center' }
            spacing={ 4 }
            style={ {height: '100%'} }
        >
            { props.children }
        </Grid>
    );
