const { MongoClient } = require("mongodb");

const app = Elm.Main.init();

app.ports.sendSelectedMolecule.subscribe(async (message) => {
  console.log(message);
});

app.ports.mongoFind.subscribe(async (message) => {
  const client = new MongoClient(message.uri);
  try {
    const database = client.db(message.database);
    const collection = database.collection(message.collection);
    const results = await collection
      .find(JSON.parse(message.query))
      .limit(30)
      .toArray();
    app.ports.receiveMolecules.send(results);
  } finally {
    await client.close();
  }
});

app.ports.mongoAggregate.subscribe(async (message) => {
  const client = new MongoClient(message.uri);
  try {
    const database = client.db(message.database);
    const collection = database.collection(message.collection);
    const results = await collection
      .aggregate(JSON.parse(message.query))
      .limit(30)
      .toArray();
    app.ports.receiveMolecules.send(results);
    console.log(results);
  } finally {
    await client.close();
  }
});
