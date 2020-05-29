import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../models';
import { AnyAction } from '@reduxjs/toolkit';
import Button from '@material-ui/core/Button';
import { getPageMolecules } from '../../../actions';


interface IGetMoleculesButtonProps
{
    getFirstPage: () => void;
}


function GetMoleculesButton(
    props: IGetMoleculesButtonProps,
)
{
    return (
        <Button onClick={ props.getFirstPage } >
            Get Molecules
        </Button>
    );
}


function mapStateToProps(
    state: IState,
)
{
    return {
    };
}


function mapDispatchToProps(
    dispatch: (action: any) => void,
)
{
    return {
        getFirstPage:
            () => dispatch(
                getPageMolecules({
                    pageIndex: 0,
                    successSnackbar: (message: string) => {},
                    errorSnackbar: (message: string) => {},
                })
            ),
    };
}



export const GetMoleculesButtonComponent
    = connect(mapStateToProps, mapDispatchToProps)(GetMoleculesButton);
