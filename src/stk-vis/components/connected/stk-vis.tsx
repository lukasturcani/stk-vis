import { connect } from 'react-redux';
import {
    props,
    StkVis as State,
    Props,
} from 'StkVis.StkVis';
import {
    Action,
    updateFields,
    updateMoleculePage,
} from 'StkVis.Action';
import {
    MongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    PageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';
import {
    StkVis as StkVisBase,
} from 'stk-vis/styled/stk-vis';
import {
    DispatchProps,
} from 'stk-vis/base/stk-vis';
import {
    initializeMoleculeBrowser,
} from './utilities';


function mapStateToProps(
    state: State,
)
    : Props
{
    return {...props(state)};
}


function mapDispatchToProps(
    dispatch: (action: Action) => void,
)
    : DispatchProps
{
    return {
        dispatch: {
            updateFields: (mongoData: MongoData) =>
                dispatch(updateFields(mongoData)),

            updateMoleculePage: (pageData: PageData) =>
                dispatch(updateMoleculePage(pageData)),

            initializeMoleculeBrowser:
                initializeMoleculeBrowser(dispatch),
        },
    };
}


export const StkVis
    = connect(mapStateToProps, mapDispatchToProps)(StkVisBase);
