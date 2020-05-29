import { getPageIndex, getPageKind } from '../../../selectors';
import { Nothing, Just, Maybe, MaybeKind } from '../../../utilities';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    PageKind,
} from '../../../models';


export function assertNever(arg: never): never { throw Error(); }


interface IPageData
{
    pageIndex: number;
    pageKind: PageKind;
}


export interface MoleculeRequestButtonProps
{
    pageData: Maybe<IPageData>;
    dispatchPageRequest:
        (
            pageIndex: number,
            successSnackbar:  (message: string) => void
        ) => () => void;
    isForward: boolean;
}


export function getButtonLabel(props: MoleculeRequestButtonProps)
    : string
{
    if (!props.isForward)
    {
        return 'Previous Molecules';
    }

    const pageData: Maybe<IPageData>
        = props.pageData;

    switch (pageData.kind)
    {
        case MaybeKind.Nothing:
            return 'Get Molecules';

        case MaybeKind.Just:
            if (
                pageData.value.pageKind === PageKind.LastIncomplete
                ||
                pageData.value.pageKind === PageKind.LastComplete
                ||
                pageData.value.pageKind === PageKind.OnlyIncomplete
                ||
                pageData.value.pageKind === PageKind.OnlyComplete
            ) {
                return 'Check For New Molecules';
            }
            else
            {
                return 'Next Molecules';
            }

        default:
            assertNever(pageData);
    }
}


export function getNextPageIndex(
    pageData: Maybe<IPageData>,
    isForward: boolean,
)
    : number
{
    switch(pageData.kind)
    {
        case MaybeKind.Just:

            if (
                isForward
                &&
                pageData.value.pageKind === PageKind.OnlyIncomplete
            )
            {
                return pageData.value.pageIndex;
            }
            if (
                isForward
                &&
                pageData.value.pageKind === PageKind.LastIncomplete
            )
            {
                return pageData.value.pageIndex;
            }

            const increment: number
                = (isForward)? 1 : -1;

            return pageData.value.pageIndex+increment;

        case MaybeKind.Nothing:
            return 0;

        default:
            assertNever(pageData);
    }
}


export function maybeGetPageData(
    state: IDatabaseBrowser,
)
    : Maybe<IPageData>
{
    switch(state.kind)
    {
        case DatabaseBrowserKind.Initial:
            return new Nothing();

        case DatabaseBrowserKind.Loaded:
            return new Just({
                pageIndex: getPageIndex(state),
                pageKind: getPageKind(state),
            });

        default:
            assertNever(state);
    }
}
