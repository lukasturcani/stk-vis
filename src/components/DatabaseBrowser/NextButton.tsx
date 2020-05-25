import * as React from 'react';
import { connect } from 'react-redux';
import { getPageMolecules } from '../../actions';
import { IDatabaseBrowser, DatabaseBrowserKind } from '../../models';
import { getPageIndex } from '../../selectors';
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


function NextButton({
    pageIndex,
    dispatchPageRequest,
}: {
    pageIndex: Maybe<number>,
    dispatchPageRequest: (pageIndex: number) => () => void,
})
{
    return (
        <button onClick={
                dispatchPageRequest(getNextPageIndex(pageIndex))
        } >
            Next Molecules
        </button>
    );
};


const mapStateToProps = (state: IDatabaseBrowser) => {
    return {
        pageIndex: maybeGetPageIndex(state),
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
