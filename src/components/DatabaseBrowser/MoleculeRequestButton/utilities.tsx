import { getPageIndex, getPageKind } from '../../../selectors';
import { Nothing, Just, Maybe, MaybeKind } from '../../../utilities';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    PageKind,
} from '../../../models';


export function assertNever(arg: never): never { throw Error(); }


export interface MoleculeRequestButtonProps
{
    pageIndex: Maybe<number>;

    dispatchPageRequest:
        (
            pageIndex: number,
            successSnackbar:  (message: string) => void
        ) => () => void;

    pageKind: Maybe<PageKind>;
    isForward: boolean;
}


export function getButtonLabel(props: MoleculeRequestButtonProps)
    : string
{
    if (!props.isForward)
    {
        return 'Previous Molecules';
    }

    switch (props.pageKind.kind)
    {
        case MaybeKind.Nothing:
            return 'Get Molecules';

        case MaybeKind.Just:
            if (
                props.pageKind.value === PageKind.LastIncomplete
                ||
                props.pageKind.value === PageKind.LastComplete
                ||
                props.pageKind.value === PageKind.OnlyIncomplete
                ||
                props.pageKind.value === PageKind.OnlyComplete
            ) {
                return 'Check For New Molecules';
            }
            else
            {
                return 'Next Molecules';
            }

        default:
            assertNever(props.pageKind);
    }
}


export function maybeGetPageIndex(
    state: IDatabaseBrowser,
)
    : Maybe<number>
{
    switch(state.kind)
    {
        case DatabaseBrowserKind.Initial:
            return new Nothing();

        case DatabaseBrowserKind.Loaded:
            return new Just(getPageIndex(state));

        default:
            assertNever(state);
    }
}


export function getNextPageIndex(
    pageIndex: Maybe<number>,
    isForward: boolean,
    pageKind: Maybe<PageKind>,
)
    : number
{
    switch(pageIndex.kind)
    {
        case MaybeKind.Just:

            const increment: number
                = (isForward)? 1 : -1;

            return pageIndex.value+increment;

        case MaybeKind.Nothing:
            return 0;

        default:
            assertNever(pageIndex);
    }
}


export function maybeGetPageKind(
    state: IDatabaseBrowser,
)
    : Maybe<PageKind>
{
    switch(state.kind)
    {
        case DatabaseBrowserKind.Initial:
            return new Nothing();

        case DatabaseBrowserKind.Loaded:
            return new Just(getPageKind(state));

        default:
            assertNever(state);
    }
}
