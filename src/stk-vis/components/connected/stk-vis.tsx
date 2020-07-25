import { connect } from 'react-redux';
import { props, IStkVis } from 'StkVis.StkVis';
import {
    IAction,
    updateFields,
    updateMoleculePage,
} from 'StkVis.Action';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';
import {
    Props,
} from 'StkVis.StkVis';
import {
    StkVis as StkVisBase,
} from 'stk-vis/styled/stk-vis';


function mapStateToProps(
    state: IStkVis,
)
    : Props
{
    return {...props(state)};
}


function mapDispatchToProps(
    dispatch: (action: IAction) => void,
)
    : DispatchProps
{
    return {
        updateFields: (mongoData: IMongoData) =>
            dispatch(updateFields(mongoData)),

        updateMoleculePage: (pageData: IPageData) =>
            dispatch(updateMoleculePage(pageData)),
    };
}


export const StkVis
    = connect(mapStateToProps, mapDispatchToProps)(StkVisBase);
