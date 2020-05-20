import * as React from 'react';
import { connect } from 'react-redux';


const _Row = ({columns}) => (
    <tr>{
        Object.entries(columns).map(
            ([name, value]) => <td key={name}>{value}</td>
        )
    }</tr>
);


const mapStateToProps = (state, {moleculeId}) => {
    let columns = {};
    for (let column of state.visibleColumns) {
        columns[column] = state.columnValues[column][moleculeId];
    }
    return {columns};
};


export const Row = connect(mapStateToProps)(_Row);
