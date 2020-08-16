import * as React from 'react';
import {
    Props as BaseProps
} from 'Page.MoleculeBrowser.Breadcrumbs';

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
    configuratorLink: React.FunctionComponent<ConfiguratorLinkProps>;
    browserLink: React.FunctionComponent<Empty>;
}


export interface ConfiguratorLinkProps
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
                        () => props.onClick(props.dispatch)
                    }
                />
                <props.browserLink />
            </props.breadcrumbsComponent>
        </props.container>
    );
}


