"use strict";
exports.__esModule = true;
var utilities_1 = require("../../utilities");
function getMoleculeTableEntry(_a) {
    var state = _a.state, columnName = _a.columnName, moleculeId = _a.moleculeId;
    var one = undefined;
    var visibleColumns = getVisibleColumns(state);
    var entry = visibleColumns[columnName][moleculeId];
    if (entry === undefined) {
        // This shouldn't compile because its Just<undefined>.
        return new utilities_1.Just(entry);
    }
    else {
        return new utilities_1.Nothing();
    }
}
exports.getMoleculeTableEntry = getMoleculeTableEntry;
