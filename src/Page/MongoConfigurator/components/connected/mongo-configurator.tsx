import { connect } from 'react-redux';
import {
    Props,
    Action,
    props,
    MongoConfigurator as State,
    doNothing,
} from 'Page.MongoConfigurator';
import * as Config from 'Config';

import {
    CoreProps,
    DispatchProps,
} from '../base/mongo-configurator';
import {
    MongoConfigurator as MongoConfiguratorBase,
} from '../styled/mongo-configurator';


function mapStateToProps(
    state: State,
)
    : Props<Action.Action>
{
    return {
        ...props
        ({
            initUnsortedAll:
                (payload: Config.UnsortedAll) => doNothing,

            initUnsortedBuildingBlocks:
                (payload: Config.UnsortedBuildingBlocks) => doNothing,

            initUnsortedConstructedMolecules:
                (payload: Config.UnsortedConstructedMolecules) =>
                doNothing,
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
