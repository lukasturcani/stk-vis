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
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


function MoleculeRequestButton(props: MoleculeRequestButtonProps)
{
    return (
        <Box mt={1}>
        <Button onClick={
                props.dispatchPageRequest(
                    getNextPageIndex(props.pageIndex, props.isForward)
                )
        } >
            { getButtonLabel(props) }
        </Button>
        </Box>
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
