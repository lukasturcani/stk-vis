import { connect } from 'react-redux';
import {
    Props,
    Action,
    props,
    Model,
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


function mapModelToProps(
    model: Model,
)
    : Props<Action>
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
        (model)
    };
}


function mapDispatchToProps(
    dispatch: (action: Action) => void,
)
    : DispatchProps<Action>
{
    return { dispatch };
}


export const MongoConfigurator
    = connect
    (mapModelToProps, mapDispatchToProps)
    (
        MongoConfiguratorBase as
        React.FunctionComponent<CoreProps<Action>>
    );
