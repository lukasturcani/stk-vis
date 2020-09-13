import * as React from 'react';
import {
    NoViewers as MoleculeBrowserProps,
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
    saveButtonComponent: React.FunctionComponent<SaveButtonProps>;
    sortButtonComponent: React.FunctionComponent<SortButtonProps<a>>;
    moleculeTableComponent:
        React.FunctionComponent<MoleculeTableProps<a>>;
    nextButtonComponent: React.FunctionComponent<NextButtonProps<a>>;
    backButtonComponent: React.FunctionComponent<BackButtonProps<a>>;
    navigationButtonContainer: React.FunctionComponent<Empty>;
    viewerSwitchComponent:
        React.FunctionComponent<ViewerSwitchProps<a>>;

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
