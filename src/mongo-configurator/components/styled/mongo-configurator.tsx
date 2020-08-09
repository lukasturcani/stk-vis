import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    MongoConfigurator as MongoConfiguratorBase,
    CoreProps,
    ButtonProps,
} from 'mongo-configurator/base/mongo-configurator';
import {
    InputFields
} from './input-fields';


export function MongoConfigurator<a>(
    props: CoreProps<a>,
)
{
    return <MongoConfiguratorBase
        component={ Container }
        inputFields={ InputFields }
        button={ Button }
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

const Button: React.FunctionComponent<ButtonProps>
    = (props) => (
        <ButtonBase
            variant={ 'contained' }
            color={ 'primary' }
            {...props}
        >
            <SearchIcon />
        </ButtonBase>
    );
