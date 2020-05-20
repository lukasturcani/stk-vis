import * as React from 'react';
import { connect } from 'react-redux';
import { getNextMolecules } from '../actions';


const _NextButton = ({onClick}) => (
    <button onClick={ onClick } >
        Next Molecules
    </button>
);


const mapStateToProps = ({ moleculeRequestState }) => {
    return {};
};


const X = () => {
        console.log('dispatched');
        return (dispatch, getState) => {
            console.log('dispatched2');
            return {
                payload: {
                },
            };
        };
    };


const mapDispatchToProps = dispatch => {
    return {
        onClick: () => dispatch(getNextMolecules),
    };
};


export const NextButton =  connect(
    mapStateToProps,
    mapDispatchToProps,
)(_NextButton);
