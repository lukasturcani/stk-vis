import * as React from 'react';
import {
    CoreProps as ConfiguratorProps
} from '../../MongoConfigurator/components/base/mongo-configurator';
import {
    CoreProps as MoleculeBrowserProps
} from '../../MoleculeBrowser/Props/components/base';
import {
    CoreProps as BBAllViewersCoreProps,
} from '../../BuildingBlockBrowser/components/base/browser/all-viewers';
import {
    CoreProps as BBTwoDViewerCoreProps,
} from '../../BuildingBlockBrowser/components/base/browser/2d-viewer';
import {
    AllViewers as BBAllViewersProps,
    TwoDViewer as BBTwoDViewerProps,
} from 'Page.BuildingBlockBrowser';
import {
    Props as BaseProps,
    Action,
} from 'Page.StkVis';


export interface DispatchProps
{
    dispatch: (action: Action) => void;
}

export type CoreProps = BaseProps & DispatchProps;


interface Props extends BaseProps, DispatchProps
{
    mongoConfigurator:
        React.FunctionComponent<ConfiguratorProps<Action>>;

    moleculeBrowser:
        React.FunctionComponent<MoleculeBrowserProps<Action>>;

    bbAllViewers:
        React.FunctionComponent<BBAllViewersCoreProps<Action>>;

    bbTwoDViewer:
        React.FunctionComponent<BBTwoDViewerCoreProps<Action>>;


}

export function StkVis<a>(
    props: Props,
)
{
    if (props.value0.type === "Mongo Configurator")
    {
        return <props.mongoConfigurator
            dispatch={props.dispatch}
            {...props.value0}
        />;
    }
    if (props.value0.type === "Molecule Browser")
    {
        return <props.moleculeBrowser
            dispatch={props.dispatch}
            {...props.value0}
        />;
    }
    if (
        props.value0.value0.type
        === "Building Block Browser All Viewers"
    ) {
        return <props.bbAllViewers
            dispatch={props.dispatch}
            {...props.value0 as BBAllViewersProps<Action>}
        />;
    }
    if (
        props.value0.value0.type
        === "Building Block Browser 2D Viewer"
    ) {
        return <props.bbTwoDViewer
            dispatch={props.dispatch}
            {...props.value0 as BBTwoDViewerProps<Action>}
        />;
    }
    return <div>YOU SHOULD NEVER SEE THIS!!</div>;
}
