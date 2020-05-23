import * as React from 'react';
import { connect } from 'react-redux';
import { getNextMolecules } from '../../actions';


function NextButton({
    onClick,
}: {
    onClick: () => any,
})
{
    return (
        <button onClick={ onClick } >
            Next Molecules
        </button>
    );
};


const mapStateToProps = () => {
    return {};
};


function mapDispatchToProps(dispatch: (arg: any) => any)
{
    return {
        onClick: () => dispatch(getNextMolecules),
    };
};


export const NextButtonComponent
    = connect(mapStateToProps, mapDispatchToProps)(NextButton);
