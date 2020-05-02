import * as React from 'react';
import { connect } from 'react-redux';


const Row = ({columns}) => (
    <tr>{
        Object.entries(columns).map(
            ([name, value]) => <td key={name}>{value}</td>
        )
    }</tr>
);


const mapStateToProps = (state, {moleculeKey}) => {
    let columns = {moleculeKey};
    for (let column of state.visibleColumns) {
        columns[column] = state[column][moleculeKey];
    }
    return {columns};
};


export default connect(mapStateToProps)(Row);
