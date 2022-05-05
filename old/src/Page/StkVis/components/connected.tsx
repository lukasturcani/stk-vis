import { connect } from 'react-redux';
import {
    Props as StkVisProps,
} from 'Page.StkVis';
import {
    Model,
    Action,
    props,
} from 'Page.StkVis';
import {
    DispatchProps,
    CoreProps,
} from './base';
import {
    StkVis as StkVisBase
} from './styled';


function mapModelToProps<a>(
    model: Model,
)
    : StkVisProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...props(model) };
}


function mapDispatchToProps(
    dispatch: (action: Action) => void,
)
    : DispatchProps
{
    return { dispatch };
}


export const StkVis
    = connect
    (mapModelToProps, mapDispatchToProps)
    (
        StkVisBase as
        React.FunctionComponent<CoreProps>
    );
