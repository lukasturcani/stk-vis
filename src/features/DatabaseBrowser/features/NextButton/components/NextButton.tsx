import * as React from 'react';
import { connect } from 'react-redux';
import { getNextMolecules } from '../actions';


const NextButton = ({onClick}) => (
    <button onClick={ onClick } >
        Next Molecules
    </button>
);


const mapStateToProps = ({ moleculeRequestState }) => {
    return {};
};


const mapDispatchToProps = dispatch => {
    return {
        onClick: () => dispatch(getNextMolecules),
    };
};


export const NextButtonComponent
    = connect(mapStateToProps, mapDispatchToProps)(NextButton);
