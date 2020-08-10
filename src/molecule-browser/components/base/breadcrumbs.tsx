import * as React from 'react';
import {
    BreadcrumbsProps as BaseProps
} from 'MoleculeBrowser.MoleculeBrowser';

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

export type CoreProps<a> = BaseProps<a> & DispatchProps<a>;

type Empty = Record<string, unknown>;

interface Props<a> extends CoreProps<a>
{
    container: React.FunctionComponent<Empty>;
    breadcrumbs: React.FunctionComponent<Empty>;
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
            <props.breadcrumbs>
                <props.configuratorLink
                    onClick={
                        () => props.value0.onClick(props.dispatch)
                    }
                />
                <props.browserLink />
            </props.breadcrumbs>
        </props.container>
    );
}


