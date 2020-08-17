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
    changeSortedCollection,
} from 'Page.MoleculeBrowser.SortedConstructedMolecules';
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
            changeSortedCollection,
            selectMolecule,

            initMongoConfigurator:
                (payload: Config.MongoConfigurator) => doNothing,

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


export const SortedConstructedMolecules
    = connect
    (mapModelToProps, mapDispatchToProps)
    (
        MoleculeBrowser as
        React.FunctionComponent<CoreProps<Action>>
    );
