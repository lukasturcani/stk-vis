import { connect } from 'react-redux';
import {
    props,
    IMongoConfigurator,
} from 'MongoConfigurator.MongoConfigurator';

import * as Action
from 'MongoConfigurator.Action';

import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';

import * as UpdateFields
from 'MongoConfigurator.UpdateFields.UpdateFields';

import {
    BaseProps,
    DispatchProps,
} from 'mongo-configurator/base/mongo-configurator';
import {
    MongoConfigurator as MongoConfiguratorBase,
} from 'mongo-configurator/styled/mongo-configurator';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';


function mapStateToProps(
    state: IMongoConfigurator,
)
    : BaseProps
{
    return props(state).value0;
}


function mapDispatchToProps(
    dispatch: (action: Action.IAction) => void,
)
    : DispatchProps
{
    return {
        updateFields:
            (mongoData: IMongoData) =>
                dispatch(
                    Action.updateFields(
                        UpdateFields.updateFields(mongoData)
                    )
                ),

        updateMoleculePage:
            (pageData: IPageData) => console.log(pageData),
    };
}


export const MongoConfigurator
    = connect
    (mapStateToProps, mapDispatchToProps)
    (MongoConfiguratorBase);
