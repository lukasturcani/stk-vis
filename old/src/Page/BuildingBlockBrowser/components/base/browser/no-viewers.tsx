import * as React from 'react';
import {
    NoViewers as BrowserProps,
} from 'Page.BuildingBlockBrowser'
import {
    CoreProps as MoleculeTableProps,
} from '../../../../Assets/MoleculeTable/components/base';
import {
    CoreProps as BreadcrumbsProps,
} from '../breadcrumbs';
import {
    Props as SaveButtonProps,
} from 'Page.SaveButton';
import {
    CoreProps as ViewerSwitchProps,
} from '../../../../Assets/ViewerSwitch/components/base';
import {
    CoreProps as ColumnButtonProps,
} from '../../../../Assets/ColumnButton/components/base/column-button';


type Empty = Record<string, unknown>;

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export type CoreProps<a> = DispatchProps<a> & BrowserProps<a>;

interface Props<a> extends BrowserProps<a>, DispatchProps<a>
{
    root: React.FunctionComponent<Record<string, unknown>>;
    breadcrumbsComponent: React.FunctionComponent<BreadcrumbsProps<a>>;
    configContainer: React.FunctionComponent<Empty>;
    moleculeTableComponent:
        React.FunctionComponent<MoleculeTableProps<a>>;
    viewerSwitchComponent:
        React.FunctionComponent<ViewerSwitchProps<a>>;
    saveButtonComponent: React.FunctionComponent<SaveButtonProps>;
    columnButtonComponent:
        React.FunctionComponent<ColumnButtonProps<a>>;
}


export function MoleculeBrowser<a>(
    props: Props<a>,
)
{
    return (
        <props.root>
            <props.breadcrumbsComponent
                dispatch={props.dispatch}
                {...props.value0.breadcrumbs}
            />
            <props.configContainer>
                <props.columnButtonComponent
                    dispatch={props.dispatch}
                    {...props.value0.columnButton}
                />
                <props.viewerSwitchComponent
                    dispatch={props.dispatch}
                    {...props.value0.twoDViewerSwitch}
                />
                <props.viewerSwitchComponent
                    dispatch={props.dispatch}
                    {...props.value0.threeDViewerSwitch}
                />
                <props.saveButtonComponent
                    {...props.value0.saveButton}
                />
            </props.configContainer>
            <props.moleculeTableComponent
                dispatch={props.dispatch}
                {...props.value0.moleculeTable}
            />
        </props.root>
    );
}
