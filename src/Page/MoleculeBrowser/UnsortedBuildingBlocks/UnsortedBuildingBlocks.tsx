import { connect } from 'react-redux';
import {
    Props as MoleculeBrowserProps,
} from 'Page.MoleculeBrowser.Props';
import {
    Model,
    Action,
    props,
    updateMoleculePage,
    doNothing,
    selectMolecule,
} from 'Page.MoleculeBrowser.UnsortedBuildingBlocks';
import {
    SortType
} from 'SortType';
import {
    DispatchProps,
    CoreProps,
} from '../Props/components/base';
import {
    MoleculeBrowser
} from '../Props/components/styled';
import * as Config from 'Config';


function mapModelToProps<a>(
    model: Model,
)
    : MoleculeBrowserProps<Action>
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return {
        ...props
        ({
            updateMoleculePage,

            selectMolecule,

            initMongoConfigurator:
                (payload: Config.MongoConfigurator) => doNothing,

            initSortedBuildingBlocks:
                (payload: Config.SortedBuildingBlocks) => doNothing,

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


export const UnsortedBuildingBlocks
    = connect
    (mapModelToProps, mapDispatchToProps)
    (
        MoleculeBrowser as
        React.FunctionComponent<CoreProps<Action>>
    );
