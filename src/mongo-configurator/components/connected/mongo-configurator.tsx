import { connect } from 'react-redux';
import {
    Props,
    props,
    MongoConfigurator as State,
} from 'MongoConfigurator.MongoConfigurator';

import * as Action
from 'MongoConfigurator.Action';

import {
    CoreProps,
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
    : Props<Action.Action>
{
    return {
        ...props
        ({
            initializeUnsortedAll: Action.initializeUnsortedAll,

            initializeUnsortedBuildingBlocks:
                Action.initializeUnsortedBuildingBlocks,

            initializeUnsortedConstructedMolecules:
                Action.initializeUnsortedConstructedMolecules,
        })
        (state)
    };
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
    : DispatchProps<Action.Action>
{
    return { dispatch };
}


export const MongoConfigurator
    = connect
    (mapStateToProps, mapDispatchToProps)
    (
        MongoConfiguratorBase as
        React.FunctionComponent<CoreProps<Action.Action>>
    );
