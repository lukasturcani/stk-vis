import * as React from 'react';
import {
    BreadcrumbsProps as BaseProps
} from 'Page.BuildingBlockBrowser';

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export type CoreProps<a> = BaseProps<a> & DispatchProps<a>;

type Empty = Record<string, unknown>;

interface Props<a> extends CoreProps<a>
{
    container: React.FunctionComponent<Empty>;
    breadcrumbsComponent: React.FunctionComponent<Empty>;
    configuratorLink: React.FunctionComponent<LinkProps>;
    resultsLink: React.FunctionComponent<LinkProps>;
    historyLink: React.FunctionComponent<LinkProps>;
    currentLink: React.FunctionComponent<Empty>
}


export interface LinkProps
{
    onClick: () => void;
}


export function Breadcrumbs<a>(
    props: Props<a>,
)
{
    return (
        <props.container>
            <props.breadcrumbsComponent>
                <props.configuratorLink
                    onClick={
                        () => props.mongoDbClick(props.dispatch)
                    }
                />
                <props.resultsLink
                    onClick={
                        () => props.resultsClick(props.dispatch)
                    }
                />
                {
                    props.historyClick().map(
                        (onClick, key) =>
                            <props.historyLink
                                key={key}
                                onClick={
                                    () => onClick(props.dispatch)
                                }
                            />
                    )
                }
                <props.currentLink />
            </props.breadcrumbsComponent>
        </props.container>
    );
}


