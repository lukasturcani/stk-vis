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
} from 'Page.MoleculeBrowser.UnsortedAll';
import {
    SortType
} from 'SortType';
import {
    DispatchProps,
    CoreProps,
} from '../Props/components/base/molecule-browser';
import {
    MoleculeBrowser
} from '../Props/components/styled/molecule-browser';


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

            setUnsorted: doNothing,

            selectMolecule,

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


export const UnsortedAll
    = connect
    (mapModelToProps, mapDispatchToProps)
    (
        MoleculeBrowser as
        React.FunctionComponent<CoreProps<Action>>
    );
