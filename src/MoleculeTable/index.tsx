import * as React from 'react';
import { connect } from 'react-redux';
import Row from './Row';


const MoleculeTable = ({columns, moleculeIds}) => (
    <table>
        <thead>
            <tr>{
                columns.map(column => <th key={column}>{column}</th>)
            }</tr>
        </thead>
        <tbody>{
            moleculeIds.map(
                moleculeId =>
                    <Row key={moleculeId} moleculeId={moleculeId} />
            )
        }</tbody>
    </table>
);


const mapStateToProps = state => {
    return {
        columns: state.visibleColumns,
        moleculeIds: Array.from(
            {length: state.molecules.length},
            (_, i) => i,
        ),
    };

};


export default connect(mapStateToProps)(MoleculeTable);
