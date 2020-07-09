import {
    PageKind,
} from '../types';


interface Options
{
    numItems: number;
    pageIndex: number;
    numEntriesPerPage: number;
}


export function getPageKind(
    options: Options,
)
    : PageKind
{
    const isFirstPage: boolean
        = options.pageIndex === 0;

    const isLastPage: boolean
        // The requested number of items should be numEntriesPerPage+1,
        // so you getting numEntriesPerPage means that the request
        // returned less than the desired number of items. This means
        // means the current page is the last page.
        = options.numItems <= options.numEntriesPerPage;

    const isIncomplete: boolean
        = options.numItems < options.numEntriesPerPage;

    if (isFirstPage && isLastPage && isIncomplete)
    {
        return PageKind.OnlyIncomplete;
    }
    if (isFirstPage && isLastPage && !isIncomplete)
    {
        return PageKind.OnlyComplete;
    }
    if (isFirstPage && !isLastPage)
    {
        return PageKind.First;
    }
    if (!isFirstPage && isLastPage && isIncomplete)
    {
        return PageKind.LastIncomplete;
    }
    if (!isFirstPage && isLastPage && !isIncomplete)
    {
        return PageKind.LastComplete;
    }
    if (!isFirstPage && !isLastPage)
    {
        return PageKind.Middle;
    }

    throw Error('This should never be reached!');
}
