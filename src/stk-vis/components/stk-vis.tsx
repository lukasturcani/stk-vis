import * as React from 'react';
import { connect } from 'react-redux';
import {
    MongoConfigurator,
} from 'mongo-configurator/components/mongo-configurator';
import { props } from 'StkVis.StkVis';


function Component(
    props: any,
)
{
    switch (props.kind)
    {
        case 'Mongo Configurator':
        {
            return <MongoConfigurator { ...props } />;
        }
    }
}


function mapStateToProps(state: any)
{
    return props(state);
}

function mapDispatchToProps(dispatch: (action: any) => void)
{
    return { dispatch };
}


export const StkVis
    = connect(mapStateToProps, mapDispatchToProps)(Component);
