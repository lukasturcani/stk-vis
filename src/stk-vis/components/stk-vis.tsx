import * as React from 'react';
import { connect } from 'react-redux';
import {
    MongoConfigurator,
} from './styled/mongo-configurator/mongo-configurator';
import { props, IProps, IStkVis } from 'StkVis.StkVis';
import { IAction, updateFields } from 'StkVis.Action';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';


interface DispatchProps
{
    updateFields: (mongoData: IMongoData) => void;
    updateMoleculePage: (pageData: IPageData) => void;
}

interface PropsWithDispatch extends IProps, DispatchProps
{
}

function Component(
    props: PropsWithDispatch,
)
{
    switch (props.kind)
    {
        case 'Mongo Configurator':
        {
            return <MongoConfigurator
                { ...props }
            />;
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
    : DispatchProps
{
    return {
        updateFields: (mongoData: IMongoData) =>
            dispatch(updateFields(mongoData)),

        updateMoleculePage: (pageData: IPageData) =>
            console.log(pageData),

    };
}


export const StkVis
    = connect(mapStateToProps, mapDispatchToProps)(Component);
