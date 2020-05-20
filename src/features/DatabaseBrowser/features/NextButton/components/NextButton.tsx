import * as React from 'react';
import { connect } from 'react-redux';
import { getNextMolecules } from '../actions';


const _NextButton = ({moleculesRequestState, onClick}) => (
    <button onClick={ onClick } >
        Next Molecules
    </button>
);


const mapStateToProps = state => {
    return {};
};


const mapDispatchToProps = dispatch => {
    return {
        onClick: () => dispatch(getNextMolecules()),
    };
};


export const NextButton =  connect(
    mapStateToProps,
    mapDispatchToProps,
)(_NextButton);
