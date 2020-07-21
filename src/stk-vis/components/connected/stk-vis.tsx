import { connect } from 'react-redux';
import { props, IProps, IStkVis } from 'StkVis.StkVis';
import { IAction, updateFields } from 'StkVis.Action';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';
import {
    StkVis as StkVisBase,
    BaseProps,
    DispatchProps,
} from 'stk-vis/components/stk-vis';


function mapStateToProps(
    state: IStkVis,
)
    : BaseProps
{
    return props(state).value0.value0;
}


function mapDispatchToProps(
    dispatch: (action: IAction) => void,
)
    : DispatchProps
{
    return {
        kind: 'Mongo Configurator',
        updateFields: (mongoData: IMongoData) =>
            dispatch(updateFields(mongoData)),

        updateMoleculePage: (pageData: IPageData) =>
            console.log(pageData),

    };
}


export const StkVis
    = connect(mapStateToProps, mapDispatchToProps)(StkVisBase);
