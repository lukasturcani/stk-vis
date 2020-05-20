import * as React from 'react';
import { connect } from 'react-redux';
import { getNextMolecules } from '../actions';


const _NextButton = ({moleculesRequestState, onClick}) => (
    <button onClick={() => onClick(moleculesRequestState)} >
        Next Molecules
    </button>
);


const mapStateToProps = { moleculesRequestState } => {
    return { moleculesRequestState };
};


const enum MoleculeRequestState {
    NoRequestSent,
    RequestFailure,
    RequestSuccess,
    RequestActive,
};

function assertNever(arg: never): never { throw Error(); }

const mapDispatchToProps = dispatch => {
    return {
        onClick: (requestState: MoleculeRequestState) => {
            switch (requestState) {
                case MoleculeRequestState.NoRequestSent:
                case MoleculeRequestState.RequestFailure:
                case MoleculeRequestState.RequestSuccess:
                    dispatch(getNextMolecules());
                    break;
                case MoleculeRequestState.RequestActive:
                    break;
                default:
                    assertNever(requestState);
            }
        },
    };
};


export const NextButton =  connect(
    mapStateToProps,
    mapDispatchToProps,
)(_NextButton);
