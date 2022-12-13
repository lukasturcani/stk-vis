const { MongoClient } = require("mongodb");

var app = Elm.Main.init();

app.ports.sendSelectedMolecule.subscribe(function (message) {
  console.log(message);
});
