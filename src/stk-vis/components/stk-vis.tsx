import * as React from 'react';
import { connect } from 'react-redux';
import {
    MongoConfigurator,
} from 'mongo-configurator/components/mongo-configurator';
import { props, IProps, IStkVis } from 'StkVis.StkVis';
import { IAction, updateFields } from 'StkVis.Action';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';

interface PropsWithDispatch extends IProps
{
    updateFields: (mongoData: IMongoData) => void;
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
    : { updateFields: (mongoData: IMongoData) => void }
{
    return {
        updateFields: (mongoData: IMongoData) =>
            dispatch(updateFields(mongoData))
    };
}


export const StkVis
    = connect(mapStateToProps, mapDispatchToProps)(Component);
