import * as React from 'react';
import { connect } from 'react-redux';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    PageKind,
} from '../../../models';
import {
    MoleculeRequestButtonProps,
    maybeGetPageIndex,
    maybeGetPageKind,
    getButtonLabel,
    getNextPageIndex,
} from './utilities';
import { getPageMolecules } from '../../../actions';
import Button from '@material-ui/core/Button';


function MoleculeRequestButton(props: MoleculeRequestButtonProps)
{
    return (
        <Button onClick={
                props.dispatchPageRequest(
                    getNextPageIndex(
                        props.pageIndex,
                        props.isForward,
                        props.pageKind,
                    )
                )
        } >
            { getButtonLabel(props) }
        </Button>
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


export const MoleculeRequestButtonComponent
    = connect
        (mapStateToProps, mapDispatchToProps)(MoleculeRequestButton);
