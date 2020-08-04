let { MongoClient } = require('mongodb');

exports.client = url => MongoClient.connect(
    url,
    {useUnifiedTopology: true}
);

exports.database = client => database => client.db(database);

exports.collections = database => database
    .listCollections(undefined, {nameOnly: true})
    .toArray()
    .then(
        collections => collections.map(collection => collection.name)
    );

exports.find = database => collection => query => database
    .collection(collection)
    .find(query)

exports.skip = number => cursor => cursor.skip(number);

exports.limit = number => cursor => cursor.limit(number);

exports.toArray = cursor => cursor.toArray();
