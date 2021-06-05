import * as React from 'react';
import {
    TwoDViewer as MoleculeBrowserProps,
} from 'Page.MoleculeBrowser.Props'
import {
    CoreProps as SortButtonProps,
} from '../../../SortButton/components/base/sort-button';
import {
    CoreProps as MoleculeTableProps,
} from '../../../../Assets/MoleculeTable/components/base';
import {
    CoreProps as ViewerSwitchProps,
} from '../../../../Assets/ViewerSwitch/components/base';
import {
    Props as TwoDViewerProps,
} from 'Page.TwoDViewer';
import {
    CoreProps as NextButtonProps,
} from '../../../NextButton/components/base'
import {
    CoreProps as BackButtonProps,
} from '../../../BackButton/components/base'
import {
    CoreProps as BreadcrumbsProps,
} from '../../../Breadcrumbs/components/base';
import {
    Props as SaveButtonProps,
} from 'Page.SaveButton';
import {
    CoreProps as ColumnButtonProps,
} from '../../../../Assets/ColumnButton/components/base/column-button';


type Empty = Record<string, unknown>;

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export type CoreProps<a> = DispatchProps<a> & MoleculeBrowserProps<a>;

interface Props<a> extends MoleculeBrowserProps<a>, DispatchProps<a>
{
    root: React.FunctionComponent<Record<string, unknown>>;
    breadcrumbsComponent: React.FunctionComponent<BreadcrumbsProps<a>>;
    configContainer: React.FunctionComponent<Empty>;
    sortButtonComponent: React.FunctionComponent<SortButtonProps<a>>;
    columnButtonComponent:
        React.FunctionComponent<ColumnButtonProps<a>>;
    moleculeTableComponent:
        React.FunctionComponent<MoleculeTableProps<a>>;
    viewerContainer: React.FunctionComponent<Empty>;
    twoDViewerComponent: React.FunctionComponent<TwoDViewerProps>;
    nextButtonComponent: React.FunctionComponent<NextButtonProps<a>>;
    backButtonComponent: React.FunctionComponent<BackButtonProps<a>>;
    navigationButtonContainer: React.FunctionComponent<Empty>;
    viewerSwitchComponent:
        React.FunctionComponent<ViewerSwitchProps<a>>;
    saveButtonComponent: React.FunctionComponent<SaveButtonProps>;

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
                <props.sortButtonComponent
                    dispatch={props.dispatch}
                    {...props.value0.sortButton}
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
            <props.viewerContainer>
                <props.twoDViewerComponent
                    {...props.value0.twoDViewer}
                />
            </props.viewerContainer>
            <props.navigationButtonContainer>
                <props.backButtonComponent
                    dispatch={props.dispatch}
                    {...props.value0.backButton}
                />
                <props.nextButtonComponent
                    dispatch={props.dispatch}
                    {...props.value0.nextButton}
                />
            </props.navigationButtonContainer>
        </props.root>
    );
}
