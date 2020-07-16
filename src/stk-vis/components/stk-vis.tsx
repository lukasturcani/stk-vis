import * as React from 'react';
import { connect } from 'react-redux';
import {
    MongoConfigurator,
} from 'mongo-configurator/components/mongo-configurator';
import { props, IProps, IStkVis } from 'StkVis.StkVis';
import { IAction } from 'StkVis.Action';

interface PropsWithDispatch extends IProps
{
    dispatch: (action: IAction) => void;
}

function Component(
    props: PropsWithDispatch,
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


function mapStateToProps(
    state: IStkVis,
)
    : IProps
{
    return props(state);
}


function mapDispatchToProps(
    dispatch: (action: IAction) => void,
)
    : { dispatch: (action: IAction) => void }
{
    return { dispatch };
}


export const StkVis
    = connect(mapStateToProps, mapDispatchToProps)(Component);
