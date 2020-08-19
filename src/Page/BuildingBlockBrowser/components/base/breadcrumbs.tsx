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
    snackbar: React.FunctionComponent<SnackbarProps>;
}


export interface LinkProps
{
    onClick: () => void;
}


export interface SnackbarProps
{
    open: boolean;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
    message: string;
}


interface Snackbar
{
    open: boolean;
    setOpen: (open: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}

export function Breadcrumbs<a>(
    props: Props<a>,
)
{

    const snackbar: Snackbar
        = getSnackbar();

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
            <props.snackbar
                open={snackbar.open}
                onClose={snackbar.onClose}
                message={snackbar.message}
            />
        </props.container>
    );
}


function getSnackbar(): Snackbar
{
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const onClose = (event?: React.SyntheticEvent, reason?: string) =>
    {
        if (reason === 'clickaway')
        {
            return;
        }
        setOpen(false);
    };

    return {
        open,
        setOpen,
        message,
        setMessage,
        onClose,
    };
}
