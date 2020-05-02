import * as React from 'react';
import { connect } from 'react-redux';
import Row from './Row';


const MoleculeTable = ({columns, moleculeKeys}) => (
    <table>
        <thead>
            <tr>{
                columns.map(column => <th key={column}>{column}</th>)
            }</tr>
        </thead>
        <tbody>{
            moleculeKeys.map(
                moleculeKey =>
                    <Row key={moleculeKey} moleculeKey={moleculeKey} />
            )
        }</tbody>
    </table>
);


const mapStateToProps = state => {
    return {
        columns: [state.moleculeKeyName, ...state.visibleColumns],
        moleculeKeys: state[state.moleculeKeyName],
    };

};


export default connect(mapStateToProps)(MoleculeTable);
