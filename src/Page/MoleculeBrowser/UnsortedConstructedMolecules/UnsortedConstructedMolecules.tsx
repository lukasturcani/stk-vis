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
} from 'Page.MoleculeBrowser.UnsortedConstructedMolecules';
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

            setSorted:
                (collection: string) =>
                (sortType: SortType) =>
                doNothing,

            selectMolecule,

            initMongoConfigurator:
                (payload: Config.MongoConfigurator) => doNothing,

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


export const UnsortedConstructedMolecules
    = connect
    (mapModelToProps, mapDispatchToProps)
    (
        MoleculeBrowser as
        React.FunctionComponent<CoreProps<Action>>
    );
