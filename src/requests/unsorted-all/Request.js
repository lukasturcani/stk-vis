exports.query = moleculeKey => ({
    [moleculeKey]: { $exists: true },
});
