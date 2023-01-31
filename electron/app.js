const { MongoClient } = require("mongodb");

customElements.define("two-d-viewer", TwoDMoleculeViewer);

const app = Elm.Main.init();

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
      .map(Function("entry", message.postprocess))
      .toArray();
    app.ports.receiveMolecules.send(results);
    console.log(results);
  } finally {
    await client.close();
  }
});
