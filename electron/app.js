const { MongoClient } = require("mongodb");

const app = Elm.Main.init();
let client = undefined;

app.ports.sendSelectedMolecule.subscribe(async (message) => {
  console.log(message);
});

app.ports.createMongoClient.subscribe(async (message) => {
  if (client !== undefined) {
    await client.close();
  }
  client = new MongoClient(message);
});

app.ports.mongoFind.subscribe(async (message) => {
  const database = client.db(message.database);
  const collection = database.collection(message.collection);
  const results = await collection.find(message.query);
  app.ports.receiveMolecules.send(results);
});
