import * as React from 'react';
import { connect } from 'react-redux';
import {
    MongoConfigurator,
} from 'mongo-configurator/components/mongo-configurator';
import { props } from 'StkVis';


function Component(
    props: any,
)
{
    switch (props.constructor.name)
    {
        case 'MongoConfigurator':
        {
            return <MongoConfigurator {...props } />;
        }
    }
}


function mapStateToProps(state: any)
{
    return props(state);
}


export const StkVis
    = connect(mapStateToProps)(Component);
