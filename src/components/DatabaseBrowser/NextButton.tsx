import * as React from 'react';
import { connect } from 'react-redux';
import { getPageMolecules } from '../../actions';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    PageKind,
} from '../../models';
import { getPageIndex, getPageKind } from '../../selectors';
import { Nothing, Just, Maybe, MaybeKind } from '../../utilities';


function assertNever(arg: never): never { throw Error(); }


function maybeGetPageIndex(
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


function getNextPageIndex(
    pageIndex: Maybe<number>
)
    : number
{
    switch(pageIndex.kind)
    {
        case MaybeKind.Just:
            return pageIndex.value+1;

        case MaybeKind.Nothing:
            return 0;

        default:
            assertNever(pageIndex);
    }
}


function maybeGetPageKind(
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


function NextButton({
    pageIndex,
    dispatchPageRequest,
    pageKind,
}: {
    pageIndex: Maybe<number>,
    dispatchPageRequest: (pageIndex: number) => () => void,
    pageKind: Maybe<PageKind>,
})
{
    let buttonLabel: string
        = 'Next Molecules';

    switch (pageKind.kind)
    {
        case MaybeKind.Nothing:
            break;

        case MaybeKind.Just:
            if (pageKind.value === PageKind.Last)
            {
                buttonLabel = 'Check For New Molecules';
            }
            break;

        default:
            assertNever(pageKind);
    }

    return (
        <button onClick={
                dispatchPageRequest(getNextPageIndex(pageIndex))
        } >
            {buttonLabel}
        </button>
    );
};


const mapStateToProps = (state: IDatabaseBrowser) => {
    return {
        pageIndex: maybeGetPageIndex(state),
        pageKind: maybeGetPageKind(state),
    };
};


function mapDispatchToProps(dispatch: (arg: any) => any)
{
    return {
        dispatchPageRequest:
            (pageIndex: number) => () =>
                dispatch(getPageMolecules(pageIndex)),
    };
};


export const NextButtonComponent
    = connect(mapStateToProps, mapDispatchToProps)(NextButton);
