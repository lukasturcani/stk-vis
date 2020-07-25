import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {
    MongoConfigurator as MongoConfiguratorBase,
    DispatchProps,
} from 'mongo-configurator/base/mongo-configurator';
import {
    Props as BaseProps
} from 'MongoConfigurator.MongoConfigurator';
import {
    InputFields
} from './input-fields';
import {
    GetMoleculesButton
} from './get-molecules-button';


export function MongoConfigurator(
    props: (BaseProps & DispatchProps),
)
{
    return <MongoConfiguratorBase
        component={ Container }
        inputFields={ InputFields }
        getMoleculesButton={ GetMoleculesButton }
        { ...props }
    />
}


const Container: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <Grid container
            alignItems={ 'center' }
            alignContent={ 'center' }
            justify={ 'center' }
            spacing={ 3 }
            style={{
                height: '100%',
                width: '99vw',
                paddingTop: '1%',
            }}
            direction='column'
        >
            { props.children }
        </Grid>
    );
