import { connect } from 'react-redux';
import {
    Props,
    props,
    MongoConfigurator as State,
} from 'MongoConfigurator.MongoConfigurator';

import * as Action
from 'MongoConfigurator.Action';

import {
    MongoData
} from 'MongoConfigurator.UpdateFields.MongoData';

import * as UpdateFields
from 'MongoConfigurator.UpdateFields.UpdateFields';

import {
    DispatchProps,
} from 'mongo-configurator/base/mongo-configurator';
import {
    MongoConfigurator as MongoConfiguratorBase,
} from 'mongo-configurator/styled/mongo-configurator';
import {
    PageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';


function mapStateToProps(
    state: State,
)
    : Props
{
    return {...props(state)};
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
    : DispatchProps
{
    return {
        updateFields:
            (mongoData: MongoData) =>
                dispatch(
                    Action.updateFields(
                        UpdateFields.updateFields(mongoData)
                    )
                ),

        updateMoleculePage:
            (pageData: PageData) => console.log(pageData),
    };
}


export const MongoConfigurator
    = connect
    (mapStateToProps, mapDispatchToProps)
    (MongoConfiguratorBase);
