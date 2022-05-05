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

exports.findOne = database => collection => query => database
    .collection(collection)
    .findOne(query)
    .then(result => result === null? [] : [result]);

exports.skip = number => cursor => cursor.skip(number);

exports.limit = number => cursor => cursor.limit(number);

exports.toArray = cursor => cursor.toArray();

exports.aggregate = database => collection => query =>
{
    return database.collection(collection).aggregate(query);
}
