import * as React from 'react';
import { connect } from 'react-redux';


function getRows(inchiKeys, numAtoms) {
    let rows = []
    for (let i = 0; i < inchiKeys.length; ++i) {
        rows.push([
            inchiKeys[i],
            numAtoms[i],
        ]);
    }
    return rows.map(([inchiKey, numAtoms]) => { return (
        <tr>
            <td>{inchiKey}</td>
            <td>{numAtoms}</td>
        </tr>
    )});
};


const MoleculeTable = ({inchiKeys, numAtoms}) => (
    <table>
        <thead>
            <tr>
                <th>InChIKey</th>
                <th>numAtoms</th>
            </tr>
        </thead>
        <tbody>
            {getRows(inchiKeys, numAtoms)}
        </tbody>
    </table>
);


const mapStateToProps = ({InChIKey, numAtoms}) => {
    return {
        inchiKeys: InChIKey,
        numAtoms,
    };

};


export default connect(mapStateToProps)(MoleculeTable);
