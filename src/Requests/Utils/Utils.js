exports.dataQuery = keyName => keys => ({
    [keyName]: {
        $in: keys
    }
});
